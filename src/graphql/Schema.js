import { buildSchema } from "graphql";

import Schema from "./Schema.gql";

Schema = Schema.toString();
const graphqlSchema = buildSchema(Schema);
export { graphqlSchema as default };
