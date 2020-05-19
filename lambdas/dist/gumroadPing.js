"use strict";
// handle a ping from Gumroad's API
// completely hardcoded for now
// would have to refactor a lot, if this platform becomes a SaaS
// primarily around handling different courses instead of hardcoding :P
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = __importDefault(require("querystring"));
const auth0_1 = require("auth0");
const generate_password_1 = __importDefault(require("generate-password"));
const secrets_1 = require("./secrets");
function response(statusCode, body) {
    return {
        statusCode,
        body: JSON.stringify(body),
    };
}
// memoize this
async function getAuth0Client() {
    const secrets = await secrets_1.auth0Tokens();
    const auth0 = new auth0_1.ManagementClient({
        domain: `${secrets.domain}.auth0.com`,
        clientId: secrets.clientId,
        clientSecret: secrets.clientSecret,
        scope: "read:users update:users create:users",
    });
    return auth0;
}
async function upsertUser(purchaseData) {
    const auth0 = await getAuth0Client();
    const users = await auth0.getUsersByEmail(purchaseData.email);
    if (users.length > 0) {
        return users[0];
    }
    else {
        return auth0.createUser({
            connection: "Username-Pass-Auth",
            email: purchaseData.email,
            name: purchaseData.full_name,
            password: generate_password_1.default.generate({
                length: 18,
                numbers: true,
                symbols: false,
                excludeSimilarCharacters: true,
            }),
        });
    }
}
const SR_PRODUCTS = [
    "https://gum.co/IeDvq",
    "https://gum.co/WTeMS",
    "https://gumroad.com/l/IeDvq",
    "https://gumroad.com/l/WTeMS",
];
exports.pingHandler = async (event) => {
    const ping = querystring_1.default.parse(event.body);
    console.log("ping for", ping.product_permalink);
    if (SR_PRODUCTS.includes(ping.product_permalink)) {
        console.log("doing the thing");
        const user = await upsertUser(ping);
        if (user) {
            const auth0 = await getAuth0Client();
            await auth0.assignRolestoUser({ id: user.user_id }, {
                // hardcoded Student role id from Auth0 URL
                roles: ["rol_wyNa81ZMSaFU7wSW"],
            });
        }
    }
    return response(200, {});
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Vtcm9hZFBpbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJndW1yb2FkUGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsbUNBQW1DO0FBQ25DLCtCQUErQjtBQUMvQixnRUFBZ0U7QUFDaEUsdUVBQXVFOzs7OztBQUd2RSw4REFBNEI7QUFDNUIsaUNBQXdDO0FBQ3hDLDBFQUF5QztBQUd6Qyx1Q0FBdUM7QUFFdkMsU0FBUyxRQUFRLENBQUMsVUFBa0IsRUFBRSxJQUFTO0lBQzdDLE9BQU87UUFDTCxVQUFVO1FBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0tBQzNCLENBQUE7QUFDSCxDQUFDO0FBRUQsZUFBZTtBQUNmLEtBQUssVUFBVSxjQUFjO0lBQzNCLE1BQU0sT0FBTyxHQUFHLE1BQU0scUJBQVcsRUFBRSxDQUFBO0lBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUksd0JBQWdCLENBQUM7UUFDakMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sWUFBWTtRQUNyQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7UUFDMUIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1FBQ2xDLEtBQUssRUFBRSxzQ0FBc0M7S0FDOUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDO0FBRUQsS0FBSyxVQUFVLFVBQVUsQ0FBQyxZQUF5QjtJQUNqRCxNQUFNLEtBQUssR0FBRyxNQUFNLGNBQWMsRUFBRSxDQUFBO0lBRXBDLE1BQU0sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFN0QsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNwQixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNoQjtTQUFNO1FBQ0wsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3RCLFVBQVUsRUFBRSxvQkFBb0I7WUFDaEMsS0FBSyxFQUFFLFlBQVksQ0FBQyxLQUFLO1lBQ3pCLElBQUksRUFBRSxZQUFZLENBQUMsU0FBUztZQUM1QixRQUFRLEVBQUUsMkJBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBQzNCLE1BQU0sRUFBRSxFQUFFO2dCQUNWLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFBRSxLQUFLO2dCQUNkLHdCQUF3QixFQUFFLElBQUk7YUFDL0IsQ0FBQztTQUNILENBQUMsQ0FBQTtLQUNIO0FBQ0gsQ0FBQztBQUVELE1BQU0sV0FBVyxHQUFHO0lBQ2xCLHNCQUFzQjtJQUN0QixzQkFBc0I7SUFDdEIsNkJBQTZCO0lBQzdCLDZCQUE2QjtDQUM5QixDQUFBO0FBRVksUUFBQSxXQUFXLEdBQUcsS0FBSyxFQUM5QixLQUFzQixFQUNBLEVBQUU7SUFDeEIsTUFBTSxJQUFJLEdBQWdCLHFCQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFLLENBQVEsQ0FBQTtJQUV0RCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUUvQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQzlCLE1BQU0sSUFBSSxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRW5DLElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxLQUFLLEdBQUcsTUFBTSxjQUFjLEVBQUUsQ0FBQTtZQUVwQyxNQUFNLEtBQUssQ0FBQyxpQkFBaUIsQ0FDM0IsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQVEsRUFBRSxFQUNyQjtnQkFDRSwyQ0FBMkM7Z0JBQzNDLEtBQUssRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBQ2hDLENBQ0YsQ0FBQTtTQUNGO0tBQ0Y7SUFFRCxPQUFPLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDMUIsQ0FBQyxDQUFBIn0=