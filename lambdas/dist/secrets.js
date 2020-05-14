"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// this memoizes secrets so we can save on API requests
// assumes lambda is still warm, useful in the general case
// I probably don't have enough visitors for it to matter :)
const secrets = {};
// access secrets manager to get auth0 tokens
// returns an object like:
// { clientId: "", clientSecret: "", domain: "" }
// because that's how they were saved in SSM
// note to self: opensource and generalize
exports.auth0Tokens = async () => {
    const SecretId = "auth0APITokensServerlessReact";
    const ssm = new aws_sdk_1.default.SecretsManager();
    const data = await ssm
        .getSecretValue({
        SecretId,
    })
        .promise();
    if (!("SecretString" in data)) {
        throw new Error(`Error getting secret ${SecretId}`);
    }
    if (data.SecretString) {
        // real production should expire this cache
        secrets[SecretId] = JSON.parse(data.SecretString);
    }
    else {
        throw new Error(`Error getting secret ${SecretId}`);
    }
    return secrets[SecretId];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjcmV0cy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNlY3JldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBeUI7QUFTekIsdURBQXVEO0FBQ3ZELDJEQUEyRDtBQUMzRCw0REFBNEQ7QUFDNUQsTUFBTSxPQUFPLEdBQThCLEVBQUUsQ0FBQTtBQUU3Qyw2Q0FBNkM7QUFDN0MsMEJBQTBCO0FBQzFCLGlEQUFpRDtBQUNqRCw0Q0FBNEM7QUFFNUMsMENBQTBDO0FBQzdCLFFBQUEsV0FBVyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3BDLE1BQU0sUUFBUSxHQUFHLCtCQUErQixDQUFBO0lBQ2hELE1BQU0sR0FBRyxHQUFHLElBQUksaUJBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtJQUNwQyxNQUFNLElBQUksR0FBRyxNQUFNLEdBQUc7U0FDbkIsY0FBYyxDQUFDO1FBQ2QsUUFBUTtLQUNULENBQUM7U0FDRCxPQUFPLEVBQUUsQ0FBQTtJQUVaLElBQUksQ0FBQyxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixRQUFRLEVBQUUsQ0FBQyxDQUFBO0tBQ3BEO0lBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ3JCLDJDQUEyQztRQUMzQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7S0FDbEQ7U0FBTTtRQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLFFBQVEsRUFBRSxDQUFDLENBQUE7S0FDcEQ7SUFFRCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUMxQixDQUFDLENBQUEifQ==