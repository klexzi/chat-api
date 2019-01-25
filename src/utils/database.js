import mongoose from "mongoose";
import * as bluebird from "bluebird";

import logger from "./logger";
import { MONGODB_URI } from "./secrets";

// bluebird.promisifyAll(mongoose);
const connectMongoDB = () => {
   return new Promise((resolve, reject) => {
   mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useMongoClient: true}).then(() => {
      logger.debug("connected to mongodb succesfully")
      resolve()
   }).catch(error => {
      logger.error(` connection to database failed `)
      logger.debug(error);
      process.exit()
   })      
   })

}

export {connectMongoDB as default}