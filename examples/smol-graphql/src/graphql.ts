import { ApolloServer, gql } from "apollo-server-lambda"
import uuidv4 from "uuid/v4"
import { getItem, updateItem } from "./dynamodb"

type ItemParams = {
  itemId?: string
  property1: string
  property2: string
}

// this is where we define the shape of our API
const schema = gql`
  type Item {
    itemId: String
    property1: String
    property2: String
  }
  type Query {
    item(itemId: String!): Item
  }
  type Mutation {
    createItem(property1: String, property2: String): Item
  }
`

// this is where the shape maps to functions
const resolvers = {
  Query: {
    // read an item from the database and return
    item: async (_: any, { itemId }: ItemParams) => {
      const result = await getItem({
        TableName: process.env.ITEM_TABLE!,
        Key: { itemId: itemId as string },
      })
      return result.Item
    },
  },
  Mutation: {
    // write item to the database
    createItem: async (_: any, { property1, property2 }: ItemParams) => {
      const itemId = uuidv4()

      // this is a little repetitive, but there's ways to improve :)
      const result = await updateItem({
        TableName: process.env.ITEM_TABLE!,
        Key: { itemId },
        UpdateExpression: "SET property1 = :property1, property2 = :property2",
        ExpressionAttributeValues: {
          ":property1": property1,
          ":property2": property2,
        },
        ReturnValues: "ALL_NEW",
      })

      return result.Attributes
    },
  },
}

// Create a GraphQL server
const server = new ApolloServer({ typeDefs: schema, resolvers })

export const handler = server.createHandler({
  cors: {
    origin: "*", // for security in production, lock this to your real endpoints
    credentials: true,
  },
})
