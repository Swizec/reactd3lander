"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
const v4_1 = __importDefault(require("uuid/v4"));
const dynamodb_1 = require("./dynamodb");
// this is where we define the shape of our API
const schema = apollo_server_lambda_1.gql `
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
`;
// this is where the shape maps to functions
const resolvers = {
    Query: {
        // read an item from the database and return
        item: async (_, { itemId }) => {
            const result = await dynamodb_1.getItem({
                TableName: process.env.ITEM_TABLE,
                Key: { itemId: itemId },
            });
            return result.Item;
        },
    },
    Mutation: {
        // write item to the database
        createItem: async (_, { property1, property2 }) => {
            const itemId = v4_1.default();
            // this is a little repetitive, but there's ways to improve :)
            const result = await dynamodb_1.updateItem({
                TableName: process.env.ITEM_TABLE,
                Key: { itemId },
                UpdateExpression: "SET property1 = :property1, property2 = :property2",
                ExpressionAttributeValues: {
                    ":property1": property1,
                    ":property2": property2,
                },
                ReturnValues: "ALL_NEW",
            });
            return result.Attributes;
        },
    },
};
// Create a GraphQL server
const server = new apollo_server_lambda_1.ApolloServer({ typeDefs: schema, resolvers });
exports.handler = server.createHandler({
    cors: {
        origin: "*",
        credentials: true,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBQXdEO0FBQ3hELGlEQUE0QjtBQUM1Qix5Q0FBZ0Q7QUFRaEQsK0NBQStDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLDBCQUFHLENBQUE7Ozs7Ozs7Ozs7OztDQVlqQixDQUFBO0FBRUQsNENBQTRDO0FBQzVDLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNMLDRDQUE0QztRQUM1QyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQU0sRUFBRSxFQUFFLE1BQU0sRUFBYyxFQUFFLEVBQUU7WUFDN0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxrQkFBTyxDQUFDO2dCQUMzQixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFXO2dCQUNsQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBZ0IsRUFBRTthQUNsQyxDQUFDLENBQUE7WUFDRixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDcEIsQ0FBQztLQUNGO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsNkJBQTZCO1FBQzdCLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBYyxFQUFFLEVBQUU7WUFDakUsTUFBTSxNQUFNLEdBQUcsWUFBTSxFQUFFLENBQUE7WUFFdkIsOERBQThEO1lBQzlELE1BQU0sTUFBTSxHQUFHLE1BQU0scUJBQVUsQ0FBQztnQkFDOUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVztnQkFDbEMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFO2dCQUNmLGdCQUFnQixFQUFFLG9EQUFvRDtnQkFDdEUseUJBQXlCLEVBQUU7b0JBQ3pCLFlBQVksRUFBRSxTQUFTO29CQUN2QixZQUFZLEVBQUUsU0FBUztpQkFDeEI7Z0JBQ0QsWUFBWSxFQUFFLFNBQVM7YUFDeEIsQ0FBQyxDQUFBO1lBRUYsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFBO1FBQzFCLENBQUM7S0FDRjtDQUNGLENBQUE7QUFFRCwwQkFBMEI7QUFDMUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxtQ0FBWSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFBO0FBRW5ELFFBQUEsT0FBTyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7SUFDMUMsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLEdBQUc7UUFDWCxXQUFXLEVBQUUsSUFBSTtLQUNsQjtDQUNGLENBQUMsQ0FBQSJ9