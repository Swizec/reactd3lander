---
title: 'Session 7 – Gatsby talks to our Lambda'
description: Everything is offline when you're computing at the lag of light.
date: 2019-05-04T13:37:00.000Z
lastUpdated: 2019-05-04T13:37:00.000Z
image: '../../src/images/metaimage.png'
---

https://www.youtube.com/watch?v=wTIeVA0ylmw

Session 7 was all about getting our Gatsby UI talking to our Lambda backend.
Click Export, save to DynamoDB, get ready to collect those thumbsup and down.

Works great 👌

Oh and we added an `allWidget` query to get a list of existing widgets and
talked about build-time versus run-time GraphQL in Gatsby.

## Build-time vs. Run-time GraphQL

![](https://i.imgur.com/Ja9KQc9.jpg)

Gatsby comes with a built-in GraphQL client by default. You can use it to bind
data to your static website at build time.

The flow works like this:

- run `gatsby build`
- use GraphQL queries in your pages and React components
- GraphQL talks to your data sources
- Gatsby builds your React
- data for props becomes hardcoded
- get static website

When you load the page, it's got all your data without making any API requests.
We put Chrome in offline mode and the site still had a full list of existing
widgets.

![](giphy:magic)

There's different source plugins you can use for this GraphQL client. File
source is the most common, used for generating pages from Markdown for example,
another one I've used is the YouTube source that lets you talk to Youtube API.

To talk to our AWS Lambda at build-time we used the generic
`gatsby-source-plugin`.

```javascript
// src/gatsby-config.js
{
    resolve: "gatsby-source-graphql",
    options: {
        typeName: "WIDGET",
        fieldName: "widgetsapi",
        url: SERVER_URI,
        refetchInterval: 60,
    },
},
```

Point it to a GraphQL endpoint, define a `fieldName` for your queries, and
specify how often to refetch fresh data.

This lets us build React components with "hardcoded" data from our backend.
Makes initial page loads super fast 👌

### Run-time GraphQL

A limitation of build-time GraphQL is that there's no mutation support. Also it
fetches data only once: when you build your site.

We want our site to be dynamic as well as static. SPA (single page app) all the
way 🤘

And we want to run mutations so we can _save data_ as well as read data. That's
where Apollo Client comes in.

Apollo Client isn't baked into Gatsby, we added it ourselves. Recap of how in
the video above, actual implementation in Session 6.

Runs in the browser after our page loads, gives us all capabilities we need to
read and save data dynamically. You'll see more of how that plays out in future
sessions, today we just scraped the surface.

## The allWidget query

![](https://i.imgur.com/azBFeko.png)

To help us try out the difference between build-time and run-time GraphQL, we
added an `allWidget` query. Took a little finagling, but it's simple in theory:

1. Add a new query to our GraphQL Schema

```javascript
// backend/src/graphql.ts

    type Query {
        widget(widgetId: String!): Widget
        allWidget: [Widget]
    }
```

2. Add a resolver that returns all widgets

```javascript
// backend/src/graphql.ts

allWidget: async () => {
  const result = await scanItems({})

  if (!result.Items) {
    return []
  }

  return result.Items.map(widget => ({
    ...widget,
    name: widget.widgetName,
  }))
}
```

3. Add a `scanItems` method to our budding DynamoDB framework

```javascript
// backend/src/dynamodb.ts

export const scanItems = async (
    params: ScanItemsParams
): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> => {
    const query = {
        TableName: process.env.DYNAMODB_TABLE!,
        ...params
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(query, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
```

Yep, same wrapper as the other functions except this time for `dynamoDB.scan`.
Scans let us scan through the entire table and find matching results.

All of them by default 🙃

## Listing all widgets with a build-time query

We then built a `<WidgetList />` React component that uses a Gatsby static
GraphQL query to fetch data from our server at build time and display a list.

Like this 👇

```javascript
// frontend/src/components/WidgetList.js

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const WidgetList = () => {
  const { widgetsapi } = useStaticQuery(
    graphql`
      query {
        widgetsapi {
          allWidget {
            widgetId
            name
          }
        }
      }
    `
  )

  return (
    <ul>
      {widgetsapi.allWidget.map(widget => (
        <li key={widget.widgetId}>{widget.name}</li>
      ))}
    </ul>
  )
}

export default WidgetList
```

We're using the `useStaticQuery` hook to run a GraphQL query and save its
result in a local variable.

As the name suggests, static queries are static and only run once – when you
build the site. Any mounting, unmounting, or reloading that happens in the
browser, has zero effect on this query.

This is neat from a performance perspective, but we'll need to do some more
work to ensure data is always fresh or re-fetched when users load our page.

Standard React rendering applies 👉 map through data, render list items.

## Saving data on Export

Run-time GraphQL helps us save data when users click the Export button.

We started with a mutation query

```javascript
// frontend/src/components/WidgetBuilder.js

import gql from 'graphql-tag'

const SAVE_WIDGET_QUERY = gql`
  mutation saveWidget($name: String!, $widgetId: String) {
    saveWidget(name: $name, widgetId: $widgetId) {
      widgetId
    }
  }
`
```

The `SAVE_WIDGET_QUERY` is defined via a `gql` tag that takes parameters, runs
the `saveWidget` mutation, and returns its `widgetId`. We can add more return
values, but we aren't doing anything with them yet anyway :)

We then use `apolloClient` from our global Apollo Client provider to run the
query.

```javascript
// frontend/src/components/WidgetBuilder.js

const result = await apolloClient.mutate({
  mutation: SAVE_WIDGET_QUERY,
  variables: {
    name: typeOfJoy,
  },
})
```

Call `.mutate`, give it the query, define the variables, aaaaand that's it.

![](giphy:shrug)

GraphQL really takes care of most of the heavy lifting for us. No dealing with
fetch requests, no unique REST endpoints to set up, nothing. Write the query,
run the query, done.

We _are_ gonna have to deal with potential failures and displaying results
somewhere. But that's a concern for another session :)

## What's next?

In our next session we're going to do some refactoring, codebase getting messy,
polish UX around saving data, and get those thumbsup/down buttons working.

That's going to require dynamically creating Thank You pages based on widgets
being saved.

![](giphy:excite)

<div class="mj-container container" style="border-radius: 5px; background-color: #FFFFFF; width: 100%;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;"> <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--> <div style="margin:0px auto;max-width:600px;background:#FFFFFF;"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; background: #FFFFFF; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:30px 0px 10px 0px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="width:600px;" class="title-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; width: 96%;" class="title"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 28px 20px 28px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:600px;"> <![endif]--> <div class="mj-column-per-100 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr class="titleText"> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="left"> <div style="cursor:auto;color:#3D3D3D;font-family:Font, 'Karla', Helvetica, Arial;font-size:22px;line-height:1.4;text-align:left;">Did you enjoy this session? (5 is yes)</div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="hidden-outlook description-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; width: 96%;" class="hidden description"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 28px 20px 28px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:600px;"> <![endif]--> <div class="mj-column-per-100 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr class="descriptionText"> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="left"> <div style="cursor:auto;color:#3D3D3D;font-family:Font, 'Karla', Helvetica, Arial;font-size:16px;line-height:22px;text-align:left;"></div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="mobile-label-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; display: none; width: 0; height: 0; max-height: 0;" class="mobile-label"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 5px 0px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:undefined;width:600px;"> <![endif]--> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:center;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="display:none;mso-hide:all;width:600px;"> <![endif]--> <!--[if mso | IE]> </td></tr></table> <![endif]--> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="opinionScale-outlook"> <![endif]--> <div style="margin:0px auto;max-width:600px;" class="opinionScale"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 28px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:3px 0px 0px 3px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/auDSeo?prefilled_answer=0" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">0</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/auDSeo?prefilled_answer=1" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">1</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/auDSeo?prefilled_answer=2" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">2</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/auDSeo?prefilled_answer=3" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">3</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/auDSeo?prefilled_answer=4" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">4</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:96px;" class="opinionScaleStep-outlook"> <![endif]--> <div class="mj-column-per-16 outlook-group-fix opinionScaleStep" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 16%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="border:none;border-bottom:1px solid #4FB0AE;border-left:1px solid #4FB0AE;border-radius:0px 3px 3px 0px;border-right:1px solid #4FB0AE;border-top:1px solid #4FB0AE;color:#4FB0AE;cursor:auto;padding:0px;" align="center" valign="middle" bgcolor="#f6fbfa"><a href="https://swizecteller.typeform.com/to/auDSeo?prefilled_answer=5" style="text-decoration:none;background:#f6fbfa;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:15px;font-weight:normal;line-height:4;text-transform:none;margin:0;padding:0;display:block;" target="_blank">5</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="mobile-label-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; display: none; width: 0; height: 0; max-height: 0;" class="mobile-label"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:5px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:undefined;width:600px;"> <![endif]--> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:center;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="display:none;mso-hide:all;width:600px;"> <![endif]--> <!--[if mso | IE]> </td></tr></table> <![endif]--> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> <tr> <td style="width:600px;" class="desktop-labels-outlook"> <![endif]--> <div style="margin: 0px auto; max-width: 600px; word-break: break-all;" class="desktop-labels"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:192px;"> <![endif]--> <div class="mj-column-per-32 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 32%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:10px 0px 10px 28px;" align="left"> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:left;"></div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:192px;"> <![endif]--> <div class="mj-column-per-32 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 32%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:10px 0px;" align="center"> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:center;"></div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td><td style="vertical-align:top;width:192px;"> <![endif]--> <div class="mj-column-per-32 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 32%;"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="border-spacing: 0px;"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;padding:10px 28px 10px 0px;" align="right"> <div style="cursor:auto;color:#4FB0AE;font-family:Font, 'Karla', Helvetica, Arial;font-size:13px;font-weight:200;line-height:22px;text-align:right;"></div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;"> <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--> <div style="margin:0px auto;max-width:600px;background:#FFFFFF;"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size: 0px; width: 100%; background: #FFFFFF; border-spacing: 0px;" align="center" border="0" width="100%"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 20px 0px;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:undefined;width:300px;"> <![endif]--> <div style="cursor:auto;color:#000000;font-family:Helvetica, Arial;font-size:12px;font-weight:normal;line-height:22px;text-align:center;"><a href="https://admin.typeform.com/signup?utm_campaign=auDSeo&utm_source=typeform.com-11725853-Pro&utm_medium=typeform&utm_content=typeform-embed-email&utm_term=EN" target="_blank" style="color: #3D3D3D; text-decoration: none;"> Powered by <strong>Typeform</strong> </a></div> <!--[if mso | IE]> </td><td style="vertical-align:undefined;width:1px;"> <![endif]--> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0px;" align="center" border="0"> <tbody> <tr> <td style="width:1px;"><img alt="" height="1px" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:100%;height:1px;" width="1"></td> </tr> </tbody> </table> <!--[if mso | IE]> </td></tr></table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td></tr></table> <![endif]--> </div>
