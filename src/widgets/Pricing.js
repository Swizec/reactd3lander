import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import PriceBox from '../widgets/PriceBox.js'
import PriceBoxSpecial from '../widgets/PriceBoxSpecial.js'
import FadeIn from 'react-lazyload-fadein'
import { ParityPrice } from 'bigmac-index-price-calculator'

const parityPrice = new ParityPrice('cb952dd732eb8e511d44d441788fcf67', true)

const Wrapper = styled.div`
  margin: 7rem 0rem;
`
const WrapperBlock = styled.div`
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 940px) {
    font-size: 20px;
  }
`

/* eslint-disable react-hooks/exhaustive-deps */
const BigBuyButton = ({ id, price, onload, coupon }) => {
  useEffect(() => onload(), [])

  const url = coupon
    ? `https://gumroad.com/l/${id}/${coupon}`
    : `https://gumroad.com/l/${id}`

  return (
    <a
      href={url}
      className="btn btn-grey btn-min-width"
      data-gumroad-product-id={id}
      data-gumroad-single-product="true"
    >
      Buy now ${price}
    </a>
  )
}
/* eslint-enable react-hooks/exhaustive-deps */

export const FadeInButton = ({ id, price, coupon }) => {
  // let offer = price * context.offer.value,
  //     strike = offer === price ? "" : <strike>${price}</strike>;

  return (
    // <a
    //     href={`https://gumroad.com/l/${id}?wanted=true`}
    //     data-gumroad-single-product="true"
    //     data-gumroad-produc-id={id}
    //     className="btn btn-grey btn-min-width gumroad-product-embed"
    // >
    //     Buy now for ${price}
    // </a>
    <FadeIn height={55} duration={150}>
      {onload => (
        <BigBuyButton id={id} coupon={coupon} price={price} onload={onload} />
      )}
    </FadeIn>
  )
}

const priceReducer = (state, action) => {
  switch (action.type) {
    case 'loaded':
      return {
        ...action.data,
      }
    default:
      return state
  }
}

const countryList = [
  'Canada',
  'Denmark',
  'Israel',
  'Brazil',
  'Australia',
  'Lebanon',
  'Uruguay',
  'Singapore',
  'New Zealand',
  'Britain',
  'South Korea',
  'Chile',
  'United Arab Emirates',
  'Czech Republic',
  'Costa Rica',
  'Colombia',
  'Thailand',
  'Japan',
  'Honduras',
  'Kuwait',
  'Pakistan',
  'Qatar',
  'Croatia',
  'Guatemala',
  'Saudi Arabia',
  'Bahrain',
  'Nicaragua',
  'Sri Lanka',
  'Peru',
  'China',
  'Hungary',
  'Vietnam',
  'Poland',
  'Jordan',
  'Oman',
  'Philippines',
  'India',
  'Hong Kong',
  'Mexico',
  'Indonesia',
  'Azerbaijan',
  'Moldova',
  'Romania',
  'Taiwan',
  'South Africa',
  'Egypt',
  'Malaysia',
  'Argentina',
  'Turkey',
  'Ukraine',
  'Russia',
].map(s => s.toLowerCase())

const Pricing = () => {
  const [{ tier1, tier2, tier3, location, adjusted }, dispatch] = useReducer(
    priceReducer,
    {
      data: {
        tier1: 59,
        tier2: 179,
        tier3: 279,
        location: {},
        adjusted: false,
      },
    }
  )

  const calcPrices = async () => {
    // parityPrice is internally memoized so this fires only 1 request
    let tier1 = await parityPrice.price(59)
    let tier2 = await parityPrice.price(179)
    let tier3 = await parityPrice.price(279)
    let adjusted = true
    const { location } = await parityPrice.priceWithLocation(tier1)

    if (tier1 >= 59) {
      tier1 = 59
      tier2 = 179
      tier3 = 279
      adjusted = false
    }

    dispatch({
      type: 'loaded',
      data: {
        location,
        tier1,
        tier2,
        tier3,
        adjusted,
      },
    })
  }

  useEffect(() => {
    calcPrices()
  }, [])

  const country = location && location.country_name
  const coupon =
    country && countryList.includes(country.toLowerCase())
      ? country
      : country && location.continent_code

  return (
    <Wrapper id="pricing">
      <WrapperBlock>
        <PriceBox
          price={
            <>
              <span className="curr">$</span>
              {tier1}
            </>
          }
          plan="Basics course"
          features={
            <div>
              A quick intro to D3
              <br />
              How React makes D3 easier
              <br />
              Quick React+D3 integration
              <br />
              Scalable dataviz components with full integration
              <br />
              Downloadable PDF/epub/mobi
              <br />
              <b>3 extra projects you can use as a cookbook</b>
              <br />
              <b>​Monthly livestream of a real dataviz project</b>
              <br />
              <br />
              Money-back guarantee
              <br />
              Yours forever
            </div>
          }
          button={
            <FadeInButton
              id="Fqwwi"
              price={tier1}
              coupon={adjusted ? coupon : null}
            />
          }
          location={adjusted ? country : null}
        />
        <PriceBoxSpecial
          price={
            <>
              <span className="curr">$</span>
              {tier3}
            </>
          }
          plan={
            <div>
              <p>
                <strong>FULL COURSE</strong>
              </p>
              <p>
                <strong>+ consultation</strong>
              </p>
            </div>
          }
          features={
            <div>
              <b>30min consultation where we discuss your usecase</b>
              <br />
              A quick intro to D3
              <br />
              How React makes D3 easier
              <br />
              Quick React+D3 integration
              <br />
              Scalable dataviz components with full integration
              <br />
              Detailed walkthrough of a large dataviz dashboard project
              <br />
              Game loop animation
              <br />
              Animating with transitions
              <br />
              Hybrid animation for complex interactions
              <br />
              Enter/update/exit animation
              <br />
              Redux and MobX basics
              <br />
              Rendering to Canvas
              <br />
              Refactoring to React Hooks
              <br />
              Downloadable PDF/epub/mobi
              <br />
              <b>14 extra projects you can use as a cookbook</b>
              <br />
              <b>​Monthly livestream of a real dataviz project</b>
              <br />
              <br />
              Money-back guarantee
              <br />
              Yours forever
            </div>
          }
          button={
            <FadeInButton
              id="Hnbtz"
              price={tier3}
              coupon={adjusted ? coupon : null}
            />
          }
          location={adjusted ? country : null}
        />
        <PriceBox
          price={
            <>
              <span className="curr">$</span>
              {tier2}
            </>
          }
          plan="FULL COURSE"
          features={
            <div>
              A quick intro to D3
              <br />
              How React makes D3 easier
              <br />
              Quick React+D3 integration
              <br />
              Scalable dataviz components with full integration
              <br />
              Detailed walkthrough of a large dataviz dashboard project
              <br />
              Game loop animation
              <br />
              Animating with transitions
              <br />
              Hybrid animation for complex interactions
              <br />
              Enter/update/exit animation
              <br />
              Redux and MobX basics
              <br />
              Rendering to Canvas
              <br />
              Refactoring to React Hooks
              <br />
              Downloadable PDF/epub/mobi
              <br />
              <b>14 extra projects you can use as a cookbook</b>
              <br />
              <b>​Monthly livestream of a real dataviz project</b>
              <br />
              <br />
              Money-back guarantee
              <br />
              Yours forever
            </div>
          }
          button={
            <FadeInButton
              id="KDLxE"
              price={tier2}
              coupon={adjusted ? coupon : null}
            />
          }
          location={adjusted ? country : null}
        />
      </WrapperBlock>
    </Wrapper>
  )
}

export default Pricing
