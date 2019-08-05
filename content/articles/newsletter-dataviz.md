---
title:
  'Which emails sparked joy – an animated timeline built with React and D3
  tutorial'
description:
  I asked thosands of people "Did you like this email?". Here's the result in a
  beautiful data visualization. Learn how to build and animate responsive data
  visualizations with React and D3.
date: 2019-08-05T15:13:00.000Z
lastUpdated: 2019-05-05T15:13:00.000Z
image: '../images/RP9ZY3C.png'
---

![Which emails sparked joy?](https://i.imgur.com/iO6X09T.gif)

Ever wondered if the emails you send spark joy? You can ask!

About a year ago I started adding a little _"Did you like this?"_ form at the
bottom of emails sent to some 9,000 readers every week. The results have been
wonderful ❤️

I now know what lands and what doesn't with my audience and it's made me a
better writer. Here's an example where I wrote the same message in 2 different
ways, sent to the same audience.

https://twitter.com/Swizec/status/1156961114476797952

What a difference writing can make!

You know what makes data like this even better? A data visualization. With
hearts and emojis and transitions and stuff!

So I fired up the monthly dataviz stream and built one 😛

https://twitter.com/Swizec/status/1156226523403128833

Watch the stream here 👇

https://www.youtube.com/watch?v=_Ja-mdt5tnQ

https://www.youtube.com/watch?v=9Ue_6kEOblU

It's a little long. Just over 5 hours. You might want to fast-forward a few
times, read this article instead. Think of it as a recap and full featured
tutorial.

Next lastish-Sunday-of-the-month you can join live. It's great fun :)

[convertkit]

Here's how we approached this data visualization on the stream:

1. Collect data
2. See what we find
3. Design a visualization
4. Build with React & D3

I'm not so good at design methodology so we're going to focus on building and
data collection. Design happened through trial and error and a few ideas in my
head.

You can try it out live,
[here](https://newsletter-joy-dataviz-swizec.swizec-react-dataviz.now.sh)

<iframe src="https://newsletter-joy-dataviz-swizec.swizec-react-dataviz.now.sh" width="100%" height="500"></iframe>

Full
[code on GitHub](https://github.com/Swizec/reactfordataviz/tree/master/newsletter-dataviz)

## Collecting data

Our data comes from 2 sources:

1. [ConvertKit](https://convertkit.com/) for subscribers, emails, open rates,
   etc.
2. [TypeForm](https://www.typeform.com/) for sentiment about each email sent

We never ended up using ConvertKit subscriber data so I'm not gonna talk about
downloading and anonymizing that. You can see it in the stream.

ConvertKit and TypeForm APIs worked great for everything else.

### ConvertKit broadcasts/emails

ConvertKit calls the emails that you manually send to your subscribers
broadcasts. There's no built-in export for broadcast data so we used the API.

Since there's no ConvertKit library I could find, we built our own following
[the docs](https://developers.convertkit.com/#broadcasts). A few `fetch()`
calls and some JavaScript glue code.

```javascript
const fetch = require('node-fetch')
const { CK_KEY } = require('./secrets.json')
const fs = require('fs')

async function getBroadcasts() {
  const page1 = await fetch(
    `https://api.convertkit.com/v3/broadcasts?page=1&api_secret=${CK_KEY}`
  ).then(res => res.json())
  const page2 = await fetch(
    `https://api.convertkit.com/v3/broadcasts?page=2&api_secret=${CK_KEY}`
  ).then(res => res.json())

  const broadcasts = [...page1.broadcasts, ...page2.broadcasts]

  const result = []

  for (let broadcast of broadcasts) {
    const stats = await fetch(
      `https://api.convertkit.com/v3/broadcasts/${
        broadcast.id
      }/stats?api_secret=${CK_KEY}`
    ).then(res => res.json())

    result.push({
      ...broadcast,
      ...stats.broadcast.stats,
    })
  }

  fs.writeFileSync('public/data/broadcasts.json', JSON.stringify(result))
}

getBroadcasts()
```

We make two API calls to get both pages of data. 50 results per page, just over
60 results in total. A real API wrapper would use some sort of loop here, but
for a quick hack this is fine.

Then we take the list of broadcasts and fetch stats for each. API gives us the
subject line, number of sends, opens, clicks, stuff like that.

We end up with a JSON file that contains all the email meta data we need for
our visualization.

```json
[{
    "id": 2005225,
    "created_at": "2019-01-14T18:17:04.000Z",
    "subject": "A bunch of cool things and neat little tips",
    "recipients": 10060,
    "open_rate": 22.24652087475149,
    "click_rate": 4.473161033797217,
    "unsubscribes": 32,
    "total_clicks": 993,
    "show_total_clicks": true,
    "status": "completed",
    "progress": 100
},
```

### TypeForm

![](https://i.imgur.com/oc3zSd7.png)

TypeForm data is best scraped with their API. They support CSV exports but
those work one by one. Manually going through all 60-some forms would take too
long.

Scraping was pretty easy though – there's an official JavaScript API client :)

```javascript
// scrape_typeform.js

const { createClient } = require("@typeform/api-client");
const fs = require("fs");

const typeformAPI = createClient({
    token: <API token>
});
```

Those few lines of code give us an API client. Documentation is a little weird
and you have to guess some naming conventions from the actual API docs, but we
made it work.

Fetching data happens in 3 steps:

1. Get list of workspaces, that's what TypeForm calls groups of forms
2. Get forms from all workspaces
3. Get responses to each form

```javascript
// scrape_typeform.js

async function scrapeData() {
  // fetches workspaces and filters the 2 we need
  const workspaces = await typeformAPI.workspaces
    .list({
      pageSize: 200,
    })
    .then(res =>
      res.items.filter(({ name }) => ['Post Emails', 'Emails'].includes(name))
    )

  // fires parallel requests to fetch forms for each workspace
  // Promise.all waits for every request to finish
  const allForms = await Promise.all(
    workspaces.map(({ id }) =>
      typeformAPI.forms
        .list({ workspaceId: id, pageSize: 200 })
        .then(forms => forms.items)
    )
  )

  // flatten list of lists of forms into a single list
  // remove any forms that are older than my first ConvertKit email
  const forms = allForms
    .reduce((acc, arr) => [...acc, ...arr], []) // node 10 doesn't have .flat
    .filter(f => new Date(f.last_updated_at) > START_DATE)

  // use the same Promise.all trick to fire parallel response requests
  const responses = await Promise.all(
    forms.map(form =>
      typeformAPI.responses
        .list({ pageSize: 200, uid: form.id })
        .then(res => ({ form: form.id, responses: res.items }))
    )
  )

  // write forms and responses as JSON files
  fs.writeFileSync('public/data/forms.json', JSON.stringify(forms))
  fs.writeFileSync('public/data/responses.json', JSON.stringify(responses))
}
```

A GraphQL API would make this much easier 😛

Again, this isn't the prettiest code but it's meant to run once so no need to
make it perfect. If you wanted to maintain this long-term, I'd recommend
breaking each step into its own function.

We end up with two JSON files containing all our sentiment data. The first
question, _"Did you like this?"_, is numeric and easy to interpret. The rest
contain words so we won't use them for our dataviz ... altho it would be cool
to figure something out.

## Setup the React app

Ok now we've got our data, time to fire up a new create-react-app, load the
data, and start exploring.

```
$ create-react-app newsletter-dataviz
$ cd newsletter-dataviz
$ yarn add d3 react-use-dimensions styled-components
```

We can work with a basic CRA app, no special requirements. Couple of
dependencies though:

- `d3` gives us simple data loading functions and helpers for calculating
  dataviz props
- `react-use-dimensions` or `useDimension` for short helps us make our dataviz
  responsive
- `styled-components` is my favorite way to use CSS in React apps

On the stream we did this part before scraping data so we had somewhere to
install dev dependencies. 😇

## Load data in the app

We want to load our dataset asynchronously on component mount. Helps our app
load fast, tell the user data is loading, and make sure all the data is ready
before we start drawing.

D3 comes with helpers for loading both CSV and JSON data so we don't have to
worry about parsing.

A custom `useDataset` hook helps us keep our code clean.

```javascript
// src/App.js

function useDataset() {
  const [broadcasts, setBroadcasts] = useState([])

  useEffect(() => {
    ;(async function() {
      // data loading and parsing stuff
    })()
  }, [])

  return { broadcasts }
}
```

The `useDataset` hook keeps one state variable: `broadcasts`. We're going to
load all our data and combine it into a single data tree. Helps keep the rest
of our code simple.

Loading happens in that `useEffect`, which runs our async function immediately
on component mount.

### Load broadcasts

```javascript
// src/App.js
function useDataset() {
	// ...
	const broadcasts = await d3
	    .json("data/broadcasts.json")
	    .then(data =>
	        data
	            .map(d => ({
	                ...d,
	                created_at: new Date(d.created_at)
	            }))
	            .filter(d => d.recipients > 1000)
	            .filter(d => d.status === "completed")
	            .sort((a, b) => a.created_at - b.created_at)
	    );
```

Inside the effect we start with `broadcasts` data.

Use `d3.json` to make a fetch request and parse JSON data into a JavaScript
object. `.then` we iterate through the data and:

- change `created_at` strings into `Date` objects
- `filter` out any broadcasts smaller than 1000 recipients
- `filter` out any incomplete broadcasts
- `sort` by `created_at`

Always a good idea to perform all your data cleanup on load. Makes your other
code cleaner and you don't have to deal with strange edge cases.

### Load forms

```javascript
// src/App.js

function useDataset() {
	// ...
	let forms = await d3.json("data/forms.json");

	// associate forms with their respective email
	const dateId = Object.fromEntries(
	    broadcasts.map(d => [dateFormat(d.created_at), d.id])
	);

	forms = Object.fromEntries(
	    forms.map(form => [
	        form.id,
	        dateId[dateFormat(new Date(form.last_updated_at))]
	    ])
	);
```

Then we load the forms data using `d3.json` again.

This time we want to associate each form with its respective email based on
date. This approach works because I usually create the email and the form on
the same day.

We make heavy use of the `fromEntries` method. It takes lists `[key, value]`
pairs and turns them into `key: value` objects.

We end up with an object like this

```javascript
{
    dtnMgo: 2710510,
    G72ihG: 2694018,
    M6iSEQ: 2685890
		// ...
```

Form id mapping to email id.

### Load responses

```javascript
// src/App.js

function useDataset() {
	// ...
	let responses = await d3.json("data/responses.json");
	responses = responses
	    .map(row => ({
	        ...row,
	        broadcast_id: forms[row.form]
	    }))
	    .filter(d => d.broadcast_id !== undefined);

	setBroadcasts(
	    broadcasts.map(d => ({
	        ...d,
	        responses: responses.find(r => r.broadcast_id === d.id)
	    }))
	);
```

Finally we load our sentiment data – `responses.json`.

Use `d3.json` to get all responses, add a `broadcast_id` to each based on the
forms object, filter out anything with an undefined broadcast. Guess the "email
and broadcast on the same day" rule isn't perfect. 🤷‍♂️

While saving data in local state with `setBroadcasts`, we also map through
every entry and `.find` relevant responses. When we're done React re-renders
our app.

## Simplest way to show a Loading screen

Since we don't want users to stare at a blank screen while data loads, we
create the simplest of loading screens.

```javascript
// src/App.js

function App() {
    const { broadcasts } = useDataset();

    if (broadcasts.length < 1) {
        return <p>Loading data ...</p>;
    }

    // ...
```

Fire up the `useDataset` hook, take broadcasts data out, see if there's
anything yet. If there isn't render a `Loading data ...` text.

That is all ✌️

Since we're using a return, we'll have to make sure we add all hooks before
this part of the function. Otherwise you fall into conditional rendering and
hooks get confused. They have to be in the same order, always.

## Responsively render emails on a timeline

![](https://i.imgur.com/UV2TzvQ.png)

We render emails on a timeline with a combination of D3 scales and React
rendering loops. Each `💌` emoji represents a single email. Its size shows the
open rate.

Responsiveness comes from dynamically recalculating D3 scales based on the size
of our SVG element with the
[`useDimensions`](https://github.com/Swizec/useDimensions) hook.

```javascript
function App() {
    const { broadcasts } = useDataset();
    const [ref, { width, height }] = useDimensions();

    // ...

    const xScale = d3
        .scaleTime()
        .domain(d3.extent(broadcasts, d => d.created_at))
        .range([30, width - 30]);

    const sizeScale = d3
        .scaleLinear()
        .domain(d3.extent(broadcasts, d => d.open_rate))
        .range([2, 25]);

    return (
        <svg ref={ref} width="99vw" height="99vh">
            {width &&
                height &&
                broadcasts
                    .map((d, i) => (
                        <Broadcast
                            key={d.id}
                            x={xScale(d.created_at)}
                            y={height / 2}
                            size={sizeScale(d.open_rate)}
                            data={d}
                        />
                    ))}
        </svg>
```

A couple steps going on here 👇

1. Get `ref`, `width`, and `height`, from `useDimensions`. The ref we'll use to
   specify what we're measuring. Width and height will update dynamically as
   the element's size changes on scroll or screen resize.
2. `xScale` is a D3 scale that maps `created_at` dates from our dataset to
   pixel values between `30` and `width-30`
3. `sizeScale` maps open rates from our dataset to pixel values between `2` and
   `25`
4. Render an `<svg>` element with the `ref` from useDimensions. Use width and
   height properties to make it full screen. When the browser resizes, this
   element will resize, useDimensions will pick up on that, update our `width`
   and `height`, trigger a re-render, and our dataviz becomes responsive 🤘
5. When all values are available `.map` through broadcast data and render a
   `<Broadcast>` component for each

### <Broadcast> component

The `<Broadcast>` component takes care of rendering and styling each letter
emoji on our visualization. Later it's going to deal with dropping hearts as
well.

We start with a `<CenteredText>` styled component.

```javascript
const CenteredText = styled.text`
  text-anchor: middle;
  dominant-baseline: central;
`
```

Takes care of centering SVG text elements horizontally and vertically. Makes
positioning much easier.

Right now the `<Broadcast>` component just renders that.

```javascript
const Broadcast = ({ x, y, size, data }) => {
  return (
    <g transform={`translate(${x}, ${y})`} style={{ cursor: 'pointer' }}>
      <CenteredText x={0} y={0} fontSize={`${size}pt`}>
        💌
      </CenteredText>
    </g>
  )
}
```

Render a grouping element, `<g>`, use an SVG transform to position at `(x, y)`
coordinates, and render a `<CenteredText>` with a `💌` emoji using the `size`
prop for font size.

The result is a responsive timeline.

![](https://i.imgur.com/Z6MC3tV.gif)

## Animate the timeline

Animating the timeline is a sort of trick 👉 change `N` of rendered emails over
time and you get an animation.

We create a `useRevealAnimation` React hook to help us out.

```javascript
// src/App.js

function useRevealAnimation({ duration, broadcasts }) {
  const [N, setN] = useState(0)

  useEffect(() => {
    if (broadcasts.length > 1) {
      d3.selection()
        .transition('data-reveal')
        .duration(duration * 1000)
        .tween('Nvisible', () => {
          const interpolate = d3.interpolate(0, broadcasts.length)
          return t => setN(Math.round(interpolate(t)))
        })
    }
  }, [broadcasts.length])

  return N
}
```

We've got a local state for `N` and a `useEffect` to start the animation. The
effect starts a new D3 transition, sets up a custom tween with an interpolator
from `0` to `broadcasts.length` and runs `setN` with a new number on every tick
of the animation.

D3 handles the heavy lifting of figuring out exactly how to change `N` to
create a nice smooth animation.

I teach this approach in more detail as hybrid animation in my
[React for DataViz](https://reactfordataviz.com) course.

The `useRevealAnimation` hook goes in our `App` component like this 👇

```javascript
// src/App.js

function App() {
    const { broadcasts } = useDataset();
    const [ref, { width, height }] = useDimensions();
    const N = useRevealAnimation({ broadcasts, duration: 10 });

    // ...

            {width &&
                height &&
                broadcasts
                    .slice(0, N)
                    .map((d, i) => (
                        <Broadcast
```

`N` updates as the animation runs and `broadcasts.slice` ensures we render only
the first `N` elements of our data. React's diffing engine figures out the rest
so existing items don't re-render.

This avoid-re-rendering part is very important to create a smooth animation of
dropping hearts.

## Add dropping hearts

Each `<Broadcast>` handles its own dropping hearts.

```javascript
// src/Broadcast.js

const Broadcast = ({ x, y, size, data, onMouseOver }) => {
  const responses = data.responses ? data.responses.responses : []

  // ratings > 3 are a heart, probably
  const hearts = responses
    .map(r => (r.answers ? r.answers.filter(a => a.type === 'number') : []))
    .flat()
    .filter(({ number }) => number > 3).length

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseOver={onMouseOver}
      style={{ cursor: 'pointer' }}
    >
      // ..
      <Hearts hearts={hearts} bid={data.id} height={y - 10} />
    </g>
  )
}
```

Get a list of `responses` out of data associated with each broadcast, flatten
into a simple array, and filter out any votes below `3` on the
`0, 1, 2, 3, 4, 5` scale. Assuming high numbers mean _"I liked this"_.

Render with a `<Hearts>` component.

### <Hearts> component

The `<Hearts>` component is a simple loop.

```javascript
// src/Broadcast.js

const Hearts = ({ bid, hearts, height }) => {
  return (
    <>
      {d3.range(0, hearts).map(i => (
        <Heart
          key={i}
          index={i}
          id={`${bid}-${i}`}
          height={height - i * 10}
          dropDuration={3}
        />
      ))}
    </>
  )
}
```

Create a counting array with `d3.range`, iterate over it, and render a
`<Heart>` for each. The `<Heart>` component declaratively takes care of
rendering itself so it drops into the right place.

### <Heart> component

```javascript
const Heart = ({ index, height, id, dropDuration }) => {
  const y = useDropAnimation({
    id,
    duration: dropDuration,
    height: height,
    delay: index * 100 + Math.random() * 75,
  })

  return (
    <CenteredText x={0} y={y} fontSize="12px">
      ❤️
    </CenteredText>
  )
}
```

Look at that, another animation hook. Hooks really simplify our code 🥰

The animation hook gives us a `y` coordinate. When that changes, the component
re-renders, and re-positions itself on the page.

That's because `y` is handled as a React state.

```javascript
// src/Broadcast.js

function useDropAnimation({ duration, height, id, delay }) {
  const [y, sety] = useState(0)

  useEffect(() => {
    d3.selection()
      .transition(`drop-anim-${id}`)
      .ease(d3.easeCubicInOut)
      .duration(duration * 1000)
      .delay(delay)
      .tween(`drop-tween-${id}`, () => {
        const interpolate = d3.interpolate(0, height)
        return t => sety(interpolate(t))
      })
  }, [])

  return y
}
```

We're using the same hybrid animation trick as before except now we added an
easing function to our D3 transition so it looks better.

The result are hearts dropping from an animated timeline.

![](https://i.imgur.com/iO6X09T.gif)

[convertkit]

## Add helpful titles

Last feature that makes our visualization useful are the titles. They create
context and tell users what they're looking at.

![](https://i.imgur.com/Le0Hj1M.png)

No dataviz trickery here, just helpful info in text form :)

```javascript
const Heading = styled.text`
  font-size: 1.5em;
  font-weight: bold;
  text-anchor: middle;
`

const MetaData = ({ broadcast, x }) => {
  if (!broadcast) return null

  // count likes
  // math the ratios for opens, clicks, etc

  return (
    <>
      <Heading x={x} y={50}>
        {broadcast ? dateFormat(broadcast.created_at) : null}
      </Heading>
      <Heading x={x} y={75}>
        {broadcast ? broadcast.subject : null}
      </Heading>
      <text x={x} y={100} textAnchor="middle">
        ❤️ {heartRatio.toFixed(0)}% likes 📖 {broadcast.open_rate.toFixed(0)}%
        reads 👆 {broadcast.click_rate.toFixed(0)}% clicks 😢{' '}
        {unsubRatio.toFixed(2)}% unsubs
      </text>
    </>
  )
}
```

We use some middle school maths to calculate the ratios we're showing, then
render a `<Heading>` styled component twice and a `<text>` component once.

Headings show the email date and title, text shows meta info about open rates
and such. Nothing fancy, but it makes the data visualization a lot better I
think.

## ❤️

<iframe src="https://newsletter-joy-dataviz-swizec.swizec-react-dataviz.now.sh" width="100%" height="500"></iframe>

And so we end up with a nice dataviz full of hearts and emojis and transitions
and animation. Great way to see which emails sparked joy 😍

Next step could be some sort of text analysis and figuring out which topics or
words correlate to more enjoyment. Could be fun but I don't think we have a big
enough dataset for proper sentiment analysis.

Maybe 🤔

Thanks for reading, ~Swizec

_See a mistake?
[Suggest an edit](https://github.com/Swizec/reactd3lander/tree/master/content/article)_

<div class="mj-container container" style="border-radius: 5px; background-color: #FFFFFF; width: 100%;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;"> <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--> <div style="margin:0px auto;max-width:600px;background:#FFFFFF;"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; background: #FFFFFF; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:30px 0px 10px 0px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="width:600px;" class="title-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; width: 96%;" class="title"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 28px 20px 28px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:600px;"> <![endif]--> <div class="mj-column-per-100 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr class="titleText"> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="left"> <div style="cursor:auto;color:#3D3D3D;font-family:Font, 'Karla', Helvetica, Arial;font-size:22px;line-height:1.4;text-align:left;">Did you enjoy this email? (5 is yes)</div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="hidden-outlook description-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; width: 96%;" class="hidden description"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 28px 20px 28px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:600px;"> <![endif]--> <div class="mj-column-per-100 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr class="descriptionText"> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="left"> <div style="cursor:auto;color:#3D3D3D;font-family:Font, 'Karla', Helvetica, Arial;font-size:16px;line-height:22px;text-align:left;"></div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="mobile-label-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; display: none; width: 0; height: 0; max-height: 0;" class="mobile-label"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 5px 0px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:undefined;width:600px;"> <![endif]--> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:center;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="display:none;mso-hide:all;width:600px;"> <![endif]--> <!--[if mso | IE]> </td></tr></table> <![endif]--> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="opinionScale-outlook"> <![endif]--> <div style="margin:0px auto;max-width:600px;" class="opinionScale"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 28px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:3px 0px 0px 3px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/TvcoJR?prefilled_answer=0" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">0</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/TvcoJR?prefilled_answer=1" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">1</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/TvcoJR?prefilled_answer=2" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">2</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/TvcoJR?prefilled_answer=3" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">3</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/TvcoJR?prefilled_answer=4" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">4</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px 3px 3px 0px;border-right:1px solid #4FB0AE;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/TvcoJR?prefilled_answer=5" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">5</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="mobile-label-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; display: none; width: 0; height: 0; max-height: 0;" class="mobile-label"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:5px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:undefined;width:600px;"> <![endif]--> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:center;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="display:none;mso-hide:all;width:600px;"> <![endif]--> <!--[if mso | IE]> </td></tr></table> <![endif]--> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="desktop-labels-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; word-break: break-all;" class="desktop-labels"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:192px;"> <![endif]--> <div class="mj-column-per-32 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 32%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:10px 0px 10px 28px;" align="left"> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:left;"></div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:192px;"> <![endif]--> <div class="mj-column-per-32 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 32%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:10px 0px;" align="center"> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:center;"></div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:192px;"> <![endif]--> <div class="mj-column-per-32 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 32%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:10px 28px 10px 0px;" align="right"> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:right;"></div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;"> <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--> <div style="margin:0px auto;max-width:600px;background:#FFFFFF;"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; background: #FFFFFF; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 20px 0px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:undefined;width:300px;"> <![endif]--> <div style="cursor:auto;color:#000000;font-family:Helvetica, Arial;font-size:12px;font-weight:normal;line-height:22px;text-align:center;"><a href="https://admin.typeform.com/signup?utm_campaign=TvcoJR&utm_source=typeform.com-11725853-Pro&utm_medium=typeform&utm_content=typeform-embed-email&utm_term=EN" target="_blank" style="color: #3D3D3D; text-decoration: none;"> Powered by <strong>Typeform</strong> </a></div> <!--[if mso | IE]> </td><td style="vertical-align:undefined;width:1px;"> <![endif]--> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0px;" align="center" border="0"> <tbody> <tr> <td style="width:1px;"><img alt height="1px" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:100%;height:1px;" width="1"></td> </tr> </tbody> </table> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </div> <
