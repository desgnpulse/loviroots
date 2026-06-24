import { GraphQLClient } from "graphql-request";

const endpoint = process.env.WP_GRAPHQL_URL;

export const wpClient = endpoint ? new GraphQLClient(endpoint) : null;
