import AWS from "aws-sdk"

// this type should be more generic
type Secret = {
  clientId: string
  clientSecret: string
  domain: string
}

// this memoizes secrets so we can save on API requests
// assumes lambda is still warm, useful in the general case
// I probably don't have enough visitors for it to matter :)
const secrets: { [key: string]: Secret } = {}

// access secrets manager to get auth0 tokens
// returns an object like:
// { clientId: "", clientSecret: "", domain: "" }
// because that's how they were saved in SSM

// note to self: opensource and generalize
export const auth0Tokens = async () => {
  const SecretId = "auth0APITokensServerlessReact"
  const ssm = new AWS.SecretsManager()
  const data = await ssm
    .getSecretValue({
      SecretId,
    })
    .promise()

  if (!("SecretString" in data)) {
    throw new Error(`Error getting secret ${SecretId}`)
  }

  if (data.SecretString) {
    // real production should expire this cache
    secrets[SecretId] = JSON.parse(data.SecretString)
  } else {
    throw new Error(`Error getting secret ${SecretId}`)
  }

  return secrets[SecretId]
}
