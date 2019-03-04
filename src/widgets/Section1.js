import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    max-width: 700px;
    margin: 0rem auto;
    padding: 0 2rem;
    .firstcharacter {
        color: #f77b12;
        float: left;
        font-weight: 900;
        font-size: 120px;
        line-height: 60px;
        padding-top: 4px;
        padding-right: 8px;
        padding-left: 3px;
    }
`;

export default class Section1 extends Component {
    render() {
        return (
            <Wrapper>
                <p>
                    So you want to build a beautiful data viz. You've got data
                    burning a hole through your pocket, an idea for a juicy
                    story, and your boss or client are waiting for results.
                </p>

                <p>
                    You want something that looks great, works in the browser,
                    performs on mobile, lets users interact with their data,
                    syncs across an entire dashboard, and works as building
                    blocks for future projects.
                </p>

                <p>Cool ... now what?</p>

                <p>
                    I remember building my first data visualization back in
                    2012. Visualized my coding habits from GitHub data.
                </p>

                <figure>
                    <img
                        src="https://swizec.com/blog/wp-content/uploads/2012/09/scatterplot-finished.png"
                        alt=""
                    />
                </figure>

                <p>I was so proud! Only took me a week. 💪</p>

                <h2>
                    &quot;I've tried D3 in the past, found it powerful but a bit
                    confusing to use&quot;
                </h2>

                <p>
                    Dynamic data visualization for the web is a pain in the ass
                    you see. Harder than it looks.
                </p>

                <p>
                    Yeah sure anyone can build a chart in google docs but that's
                    not what you're after is it? You can't build a{" "}
                    <em>product</em> on top of google sheets. You definitely
                    can't feed in dynamic data from an API, personalized to the
                    user, and let them navigate and explore.
                </p>

                <p>
                    You've heard people build these amazing things with D3. The
                    New York Times uses it, The Guardian does, so do Netflix,
                    Uber, 23andMe, Visa, Walmart, and many others. I know
                    because they've been to my workshops ;)
                </p>

                <p>
                    You hunt the web for examples and omaigod what is this!? How
                    the hell is D3 doing that? 😳
                </p>

                <figure>
                    <img
                        src="https://reactd3workshop.com/static/barchartcode-6fbc274eed4cba9b32493cab9607ff61-d9514.png"
                        alt=""
                    />
                </figure>

                <p>
                    That's a bar chart by the way. You'd never guess just
                    looking at the code. I've been doing this for years and I
                    still have to simulate D3 examples in my mind to figure out
                    how they work.
                </p>

                <p>
                    You decide that's too much and look for a library. Something
                    easy you can use to finish real quick.
                </p>

                <p>
                    You find a bunch of libraries built on top of D3. Some even
                    combine React and D3. Perfect for any modern web project!
                </p>

                <p>
                    You cobble something together and call it a day. Job well
                    done.
                </p>

                <figure>
                    <img
                        src="https://media.giphy.com/media/woZVO2B8ZQ55DqKsmN/giphy.gif"
                        alt=""
                    />
                </figure>

                <h2>Libraries are hard to customize</h2>

                <p>
                    Your boss takes one look and says{" "}
                    <em>
                        &quot;Ok but can you make it follow our style
                        guide?&quot;
                    </em>
                </p>

                <p>Errr ...</p>

                <p>
                    Okay okay, some CSS, a little trickery, tweak the arguments
                    and you got dis. Crisis averted!
                </p>

                <p>
                    <em>&quot;I don't like how this animation looks&quot;</em>
                </p>

                <p>
                    <em>&quot;Can we tweak that margin?&quot;</em>
                </p>

                <p>
                    <em>&quot;Make those bars taller&quot;</em>
                </p>

                <p>
                    <em>
                        &quot;Add a line chart and I want tooltips to show up on
                        all 5 charts when I mouse over the same data point&quot;
                    </em>
                </p>

                <p>Now you're in trouble buster. </p>

                <figure>
                    <img
                        src="https://media.giphy.com/media/IYIlvuWc21U4g/giphy.gif"
                        alt=""
                    />
                </figure>

                <p>
                    You used a library and those always break down when you
                    start customizing stuff. At some point you spend more time
                    fighting the library than building your data visualization.
                </p>

                <p>Time to learn D3.</p>

                <h2>
                    &quot;There are way too many shitty resources on D3 floating
                    around on the interwebs, and frankly, the D3 docs are shit
                    too because they're WAY TOO COMPLICATED AND VERBOSE for
                    someone that just wants to understand how it works and get
                    shit done.&quot;
                </h2>

                <p>
                    You can do what everyone else does: Copy paste some examples
                    that look like what you're building, make some tweaks, and
                    hope for the best.
                </p>

                <p>
                    You're not proud of your code and you're not quite sure how
                    it works, but it works and that's what matters. Right?
                </p>

                <p>
                    Yep that works until you have to change something. Or
                    explain how it works to another engineer on your team so
                    they can fix a bug.
                </p>

                <p>
                    God forbid you come back 6 months later looking to fix a
                    thing or add a feature. Time to re-study all of that code
                    and figure out how it works.
                </p>

                <p>ugh</p>
            </Wrapper>
        );
    }
}
