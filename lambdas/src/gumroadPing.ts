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

const SR_PRODUCTS = [
  "https://gum.co/IeDvq",
  "https://gum.co/WTeMS",
  "https://gumroad.com/l/IeDvq",
  "https://gumroad.com/l/WTeMS",
]

export const pingHandler = async (
  event: APIGatewayEvent
): Promise<APIResponse> => {
  const ping: GumroadPing = qs.parse(event.body!) as any

  console.log("ping for", ping.product_permalink)

  if (SR_PRODUCTS.includes(ping.product_permalink)) {
    console.log("doing the thing")
    const user = await upsertUser(ping)

    if (user) {
      const auth0 = await getAuth0Client()

      await auth0.assignRolestoUser(
        { id: user.user_id! },
        {
          // hardcoded Student role id from Auth0 URL
          roles: ["rol_wyNa81ZMSaFU7wSW"],
        }
      )
    }
  }

  return response(200, {})
}
