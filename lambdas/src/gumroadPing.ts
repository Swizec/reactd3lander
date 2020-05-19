// handle a ping from Gumroad's API
// completely hardcoded for now
// would have to refactor a lot, if this platform becomes a SaaS
// primarily around handling different courses instead of hardcoding :P

import { APIGatewayEvent } from "aws-lambda"
import qs from "querystring"
import { ManagementClient } from "auth0"
import passwords from "generate-password"

import { APIResponse, GumroadPing } from "./types"
import { auth0Tokens } from "./secrets"

function response(statusCode: number, body: any) {
  return {
    statusCode,
    body: JSON.stringify(body),
  }
}

// memoize this
async function getAuth0Client() {
  const secrets = await auth0Tokens()
  const auth0 = new ManagementClient({
    domain: `${secrets.domain}.auth0.com`,
    clientId: secrets.clientId,
    clientSecret: secrets.clientSecret,
    scope: "read:users update:users create:users",
  })

  return auth0
}

async function upsertUser(purchaseData: GumroadPing) {
  const auth0 = await getAuth0Client()

  const users = await auth0.getUsersByEmail(purchaseData.email)

  if (users.length > 0) {
    return users[0]
  } else {
    return auth0.createUser({
      connection: "Username-Pass-Auth",
      email: purchaseData.email,
      name: purchaseData.full_name,
      password: passwords.generate({
        length: 18,
        numbers: true,
        symbols: false,
        excludeSimilarCharacters: true,
      }),
    })
  }
}

const PRODUCTS: {[key: string]: string} = {
  "https://gum.co/IeDvq": "rol_uhLv74dIEcoIExRn", //SRD Professional
  "https://gum.co/WTeMS": "rol_yOuRBy7Yaw50bwb9", //SRD Indie Hacker
  "https://gumroad.com/l/IeDvq": "rol_uhLv74dIEcoIExRn", //SRD Professional
  "https://gumroad.com/l/WTeMS": "rol_yOuRBy7Yaw50bwb9", //SRD Indie Hacker
  "https://gum.co/Fqwwi": "rol_zpnkaVy2LcZtaKZL", //RDV_Basics,
  "https://gum.co/KDLxE": "rol_j0hosj3n5mFTwkhu", //RDV_Full,
  "https://gum.co/Hnbtz": "rol_j0hosj3n5mFTwkhu", //RDV All extras,
  "https://gumroad.com/l/Fqwwi": "rol_zpnkaVy2LcZtaKZL", //RDV_Basics
  "https://gumroad.com/l/KDLxE": "rol_j0hosj3n5mFTwkhu", //RDV_Full
  "https://gumroad.com/l/Hnbtz": "rol_E0XpXwtbt1wezjIS",  //RDV All extras
}

export const pingHandler = async (
  event: APIGatewayEvent
): Promise<APIResponse> => {
  const ping: GumroadPing = qs.parse(event.body!) as any

  console.log("ping for", ping.product_permalink)

  if (ping.product_permalink in PRODUCTS) {
    console.log("doing the thing")
    const user = await upsertUser(ping)

    if (user) {
      const auth0 = await getAuth0Client()
      const roleId = PRODUCTS[ping.product_permalink]

      await auth0.assignRolestoUser(
        { id: user.user_id! },
        {
          roles: [roleId],
        }
      )
    }
  }

  return response(200, {})
}
