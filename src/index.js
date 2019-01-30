import express from "express";
import graphqlHTTP from "express-graphql";
const playground = require("graphql-playground-middleware-express").default;

import graphqlSchema from "./graphql/Schema";
import graphqlResolver from "./graphql/resolvers";
import logger from "./utils/logger";
import { PORT } from "./utils/secrets";
import connectMongoDB from "./utils/database";
import authenticate from "./middlewares/authenticate";

const app = express();
app.use(authenticate);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError(err) {
      if (!err.originalError) {
        return { err, code: 500 };
      }
      const code = +err.originalError.code || 500;
      const message = err.message || "An Error Occurred";
      const fullError = { message, code };
      if (!err.originalError.handleError) {
        logger.error(err);
      }
      return fullError;
    }
  })
);

app.get("/playground", playground({ endpoint: "/graphql" }));
connectMongoDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`server up at port ${PORT}`);
  });
});
