---
title: 'Building a Piet Mondrian art generator with React & D3 treemaps'
description:
  You can become a famous artist by just painting colorful squares. So I
  figured what better way to experiment with D3 treemaps than to pay homage to
  Piet Mondrian.
date: 2019-11-13T15:13:00.000Z
lastUpdated: 2019-11-13T15:13:00.000Z
image: '../images/kNmeD4K.png'
---

> "lol you can become a famous artist by just painting colorful squares"

Yeah turns out generative art is really hard. And Mondrian did it manually.

[![](https://i.imgur.com/9czz3FL.gif)](https://mondrian-generator.swizec-react-dataviz.now.sh/)

[Piet Mondrian](https://en.wikipedia.org/wiki/Piet_Mondrian) was a Dutch
painter famous for his style of grids with basic squares and black lines. So
famous in fact, Google finds him as
["squares art guy"](https://www.google.com/search?q=squares+art+guy&oq=squares+art+guy&aqs=chrome..69i57.3689j0j1&sourceid=chrome&ie=UTF-8).

The signature style grew out of his earlier cubist works seeking a universal
beauty understood by a all humans.

> I believe it is possible that, through horizontal and vertical lines
> constructed with awareness, but not with calculation, led by high intuition,
> and brought to harmony and rhythm, these basic forms of beauty, supplemented
> if necessary by other direct lines or curves, can become a work of art, as
> strong as it is true.

![An early cubist work by Piet Mondrian](https://upload.wikimedia.org/wikipedia/commons/8/80/Piet_Mondrian%2C_1911%2C_Gray_Tree_%28De_grijze_boom%29%2C_oil_on_canvas%2C_79.7_x_109.1_cm%2C_Gemeentemuseum_Den_Haag%2C_Netherlands.jpg)

So I figured what better way to experiment with
[D3 treemaps](https://observablehq.com/@d3/treemap) than to pay an homage to
this great artist.

You can watch the full live stream here:

https://www.youtube.com/watch?v=6Ad0I8RZhY8

GitHub link here 👉
[Swizec/mondrian-generator](https://github.com/Swizec/mondrian-generator)

And try it out
[in your browser](https://mondrian-generator.swizec-react-dataviz.now.sh/)

<iframe style="width: 100%; height: 500px" src="https://mondrian-generator.swizec-react-dataviz.now.sh/"></iframe>

It's not as good as Mondrian originals, but we learned a lot 👩‍🎨

## What is a treemap anyway?

[![A treemap built with D3](https://raw.githubusercontent.com/d3/d3-hierarchy/master/img/treemap.png)](https://www.npmjs.com/package/d3-hierarchy)

> Introduced by Ben Shneiderman in 1991, a treemap recursively subdivides area
> into rectangles according to each node’s associated value.

In other words, a treemap takes a rectangle and packs it with smaller
rectangles based on a tiling algorithm. Each rectangle's area is proportional
to the value it represents.

Treemaps are most often used for presenting budgets and other relative sizes.
Like in this interactive
[example of a government budget from 2016](https://obamawhitehouse.archives.gov/interactive-budget).

![](https://i.imgur.com/YzOsWfp.png)

You can see at a glance most of the money goes to social security, then health
care, which is split between medicaid, children's health, etc.

Treemaps are great for recursive data like that.

## Using a D3 treemap to generate art with React

We wanted to play with treemaps per a reader's request, but couldn't find an
interesting dataset to visualize. _Generating_ data was the solution.
Parametrizing it with sliders, pure icing on the cake.

Also I was curious how close we can get :)

3 pieces have to work together to produce an interactive piece of art:

1. A recursive rendering component
2. A function that generates treemappable data
3. Sliders that control inputs to the function

### A recursive rendering component

Treemaps are recursive square subdivisions. They come with a bunch of tiling
algorithms, the most visually stunning of which is the
[squarified treemaps](https://www.win.tue.nl/~vanwijk/stm.pdf) algorithm
described in 2000 by Dutch researchers.

What is it with Dutch people and neat squares 🤔

While beautiful, the squarified treemaps algorithm did not look like a
Mondrian.

![Squarified treemap of our Mondrian function](https://i.imgur.com/sw6pO2r.png)

Subtle difference, I know, but squarified treemaps are based on the
[golden ratio](https://en.wikipedia.org/wiki/Golden_ratio) and Piet Mondrian's
art does not look like that. We used the `d3.treemapBinary` algorithm instead.
It aims to create a balanced binary tree.

#### main `<Mondrian>` component

```javascript
// src/Mondrian.js

const Mondrian = ({ x, y, width, height, data }) => {
  const treemap = d3
    .treemap()
    .size([width, height])
    .padding(5)
    .tile(d3.treemapBinary)

  const root = treemap(
    hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => 0.5 - Math.random())
  )

  return (
    <g transform={`translate(${x}, ${y})`}>
      <MondrianRectangle node={root} />
    </g>
  )
}
```

The `<Mondrian>` component takes some props and instantiates a new treemap
generator. We could've wrapped this in a `useMemo` call for better performance,
but it seemed fast enough.

We set the treemap's `size()` from width and height props, a guessed
`padding()` of 5 pixels, and a tiling algorithm.

This creates a `treemap()` generator – a method that takes data and returns
that same data transformed with values used for rendering.

The generator takes a [d3-hierarchy](https://github.com/d3/d3-hierarchy), which
is a particular data format shared by all hierarchical rendering generators in
the D3 suite. Rather than build it ourselves, we feed our source data into the
`hierarchy()` method. That cleans it up for us ✌️

We need the `sum()` method to tell the hierarchy how to sum up the values of
our squares, and we use random sorting because that produced nicer results.

#### a `<MondrianRectangle>` component for each square

We render each level of the resulting treemap with a `<MondrianRectangle>`
component.

```javascript
// src/Mondrian.js

const MondrianRectangle = ({ node }) => {
  const { x0, y0, x1, y1, children } = node,
    width = x1 - x0,
    height = y1 - y0;

  return (
    <>
      <rect
        x={x0}
        y={y0}
        width={width}
        height={height}
        style={
          fill: node.data.color,
          stroke: "black",
          strokeWidth: 5
        }
        onClick={() => alert(`This node is ${node.data.color}`)}
      />
      {children &&
        children.map((node, i) => <MondrianRectangle node={node} key={i} />)}
    </>
  );
};
```

Each rectangle gets a `node` prop with a bunch of useful properties.

- `x0, y0` defines the top left corner
- `x1, y1` is the bottom right corner
- `children` are the child nodes from our hierarchy

We render an SVG `<rect>` component as the square representing _this_ node. Its
children we render by looping through the `children` array and recursively
rendering a `<MondrianRectangle>` component for each.

The `onClick` is there just to show how you might make these interactive :)

> You can use this same principle to render any data with a treemap.

### A Mondrian data generator method

We moved the generative art piece into a custom `useMondrianGenerator` hook.
Keeps our code cleaner 😌

```javascript
// src/App.js

let mondrian = useMondrianGenerator({
  redRatio,
  yellowRatio,
  blueRatio,
  blackRatio,
  subdivisions,
  maxDepth,
})
```

The method takes a bunch of arguments that act as weights on randomly generated
parameters. Ideally we'd create a stable method that always produces the same
result for the same inputs, but that proved difficult.

As mentioned earlier, generative art is _hard_ so this method is gnarly. 😇

#### Weighed random color generator

We start with a weighed random generator.

```javascript
// src/useMondrianGenerator.js

// Create weighted probability distribution to pick a random color for a square
const createColor = ({ redRatio, blueRatio, yellowRatio, blackRatio }) => {
  const probabilitySpace = [
    ...new Array(redRatio * 10).fill('red'),
    ...new Array(blueRatio * 10).fill('blue'),
    ...new Array(yellowRatio * 10).fill('yellow'),
    ...new Array(blackRatio * 10).fill('black'),
    ...new Array(
      redRatio * 10 + blueRatio * 10 + yellowRatio * 10 + blackRatio * 10
    ).fill('#fffaf1'),
  ]

  return d3.shuffle(probabilitySpace)[0]
}
```

`createColor` picks a color to use for each square. It takes desired ratios of
different colors and uses a trick I discovered in college. There are probably
better ways to create a [weighed random method, but this works well and is
something I can understand.

You create an array with the amount of values proportional to the probabilities
you want. If you want `red` to be twice as likely as `blue`, you'd use an array
like `[red, red, blue]`.

Pick a random element from that array and you get values based on
probabilities.

The result is a `createColor` method that returns colors in the correct ratio
without knowing context of what's already been picked and what hasn't. ✌️

#### generating mondrians

The `useMondrianGenerator` hook itself is pretty long. I'll explain in code
comments so it's easier to follow along :)

```javascript
// src/useMondrianGenerator.js

// Takes inputs and spits out mondrians
function useMondrianGenerator({
  redRatio,
  yellowRatio,
  blueRatio,
  blackRatio,
  subdivisions,
  maxDepth,
}) {
  // useMemo helps us avoid recalculating this all the time
  // saves computing resources and makes the art look more stable
  let mondrian = useMemo(() => {
    // calculation is wrapped in a method so we can use recursion
    // each level gets the current "value" that is evenly split amongst children
    // we use depth to decide when to stop
    const generateMondrian = ({ value, depth = 0 }) => {
      // each level gets a random number of children based on the subdivisions argument
      const N = Math.round(1 + Math.random() * (subdivisions * 10 - depth))

      // each node contains:
      // its value, used by treemaps for layouting
      // its color, used by <MondrianRectangle> for the color
      // its children, recursively generated based on the number of children
      return {
        value,
        color: createColor({
          redRatio,
          yellowRatio,
          blueRatio,
          blackRatio,
        }),
        children:
          // this check helps us stop when we need to
          // d3.range generates an empty array of length N that we map over to create children
          depth < maxDepth * 5
            ? d3.range(N).map(_ =>
                generateMondrian({
                  value: value / N,
                  depth: depth + 1,
                })
              )
            : null,
      }
    }

    // kick off the recursive process with a value of 100
    return generateMondrian({
      value: 100,
    })
    // regenerate the base data when max depth or rate of subdivisions change
  }, [maxDepth, subdivisions])

  // Iterate through all children and update colors when called
  const updateColors = node => ({
    ...node,
    color: createColor({
      redRatio,
      yellowRatio,
      blueRatio,
      blackRatio,
    }),
    children: node.children ? node.children.map(updateColors) : null,
  })

  // useMemo again helps with stability
  // We update colors in our dataset whenever those ratios change
  // depending on subdivisions and maxDepth allows the data update from that earlier useMemo to propagate
  mondrian = useMemo(() => updateColors(mondrian), [
    redRatio,
    yellowRatio,
    blueRatio,
    blackRatio,
    subdivisions,
    maxDepth,
  ])

  return mondrian
}
```

And that creates mondrian datasets based on inputs. Now we just need the
inputs.

### Sliders for function inputs

Thanks to React Hooks, our sliders were pretty easy to implement. Each controls
a ratio for a certain value fed into a random data generation method.

Take the slider that controls the ratio of red squares for example.

It starts life as a piece of state in the `<App>` component.

```javascript
// src/App.js

const [redRatio, setRedRatio] = useState(0.2)
```

`redRatio` is the value, `setRedRatio` is the value setter, `0.2` is the
initial value.

Render the slider as a `<Range>` component.

```javascript
// src/App.js

<Range name="red" value={redRatio} onChange={setRedRatio} />
```

Value comes from our state, update state on change.

The `<Range>` component itself looks like this:

```javascript
// src/App.js

const Range = ({ name, value, onChange }) => {
  return (
    <div style={ display: "inline-block" }>
      {name}
      <br />
      <input
        type="range"
        name={name}
        min={0}
        max={1}
        step={0.1}
        value={value}
        onChange={event => onChange(Number(event.target.value))}
      />
    </div>
  );
};
```

HTML has built-in sliders so we don't have to reinvent the wheel. Render an
input, give it a `type="range"`, set value from our prop, and parse the event
value in `onChange` before feeding it back to `setRedRange` with our callback.

Now each time you move that slider, it triggers a re-render, which generates a
new Mondrian from the data.

<iframe style="width: 100%; height: 500px" src="https://mondrian-generator.swizec-react-dataviz.now.sh/"></iframe>

## Conclusion

In conclusion: generative art is hard, Piet Mondrian was brillianter than he
seems, and D3 treemaps are great fun.

Hope you enjoyed this as much as I did :)

Cheers,<br> ~Swizec

<div class="mj-container container" style="border-radius: 5px; background-color: #FFFFFF; width: 100%;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;"> <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--> <div style="margin:0px auto;max-width:600px;background:#FFFFFF;"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; background: #FFFFFF; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:30px 0px 10px 0px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="width:600px;" class="title-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; width: 96%;" class="title"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 28px 20px 28px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:600px;"> <![endif]--> <div class="mj-column-per-100 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr class="titleText"> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="left"> <div style="cursor:auto;color:#3D3D3D;font-family:Font, 'Karla', Helvetica, Arial;font-size:22px;line-height:1.4;text-align:left;">Did you enjoy this article? (5 is yes)</div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="hidden-outlook description-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; width: 96%;" class="hidden description"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 28px 20px 28px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:600px;"> <![endif]--> <div class="mj-column-per-100 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr class="descriptionText"> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="left"> <div style="cursor:auto;color:#3D3D3D;font-family:Font, 'Karla', Helvetica, Arial;font-size:16px;line-height:22px;text-align:left;"></div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="mobile-label-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; display: none; width: 0; height: 0; max-height: 0;" class="mobile-label"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 5px 0px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:undefined;width:600px;"> <![endif]--> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:center;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="display:none;mso-hide:all;width:600px;"> <![endif]--> <!--[if mso | IE]> </td></tr></table> <![endif]--> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="opinionScale-outlook"> <![endif]--> <div style="margin:0px auto;max-width:600px;" class="opinionScale"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 28px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:3px 0px 0px 3px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/bunX3o?prefilled_answer=0" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">0</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/bunX3o?prefilled_answer=1" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">1</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/bunX3o?prefilled_answer=2" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">2</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/bunX3o?prefilled_answer=3" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">3</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/bunX3o?prefilled_answer=4" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">4</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px 3px 3px 0px;border-right:1px solid #4FB0AE;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/bunX3o?prefilled_answer=5" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">5</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="mobile-label-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; display: none; width: 0; height: 0; max-height: 0;" class="mobile-label"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:5px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:undefined;width:600px;"> <![endif]--> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:center;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="display:none;mso-hide:all;width:600px;"> <![endif]--> <!--[if mso | IE]> </td></tr></table> <![endif]--> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="desktop-labels-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; word-break: break-all;" class="desktop-labels"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:192px;"> <![endif]--> <div class="mj-column-per-32 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 32%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:10px 0px 10px 28px;" align="left"> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:left;"></div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:192px;"> <![endif]--> <div class="mj-column-per-32 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 32%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:10px 0px;" align="center"> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:center;"></div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:192px;"> <![endif]--> <div class="mj-column-per-32 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 32%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:10px 28px 10px 0px;" align="right"> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:right;"></div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;"> <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--> <div style="margin:0px auto;max-width:600px;background:#FFFFFF;"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; background: #FFFFFF; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 20px 0px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:undefined;width:300px;"> <![endif]--> <div style="cursor:auto;color:#000000;font-family:Helvetica, Arial;font-size:12px;font-weight:normal;line-height:22px;text-align:center;"><a href="https://admin.typeform.com/signup?utm_campaign=bunX3o&utm_source=typeform.com-11725853-Professional&utm_medium=typeform&utm_content=typeform-embed-email&utm_term=EN" target="_blank" style="color: #3D3D3D; text-decoration: none;"> Powered by <strong>Typeform</strong> </a></div> <!--[if mso | IE]> </td><td style="vertical-align:undefined;width:1px;"> <![endif]--> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0px;" align="center" border="0"> <tbody> <tr> <td style="width:1px;"><img alt height="1px" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:100%;height:1px;" width="1"></td> </tr> </tbody> </table> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </div>
