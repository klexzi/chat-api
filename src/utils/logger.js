import {createLogger, format, transports} from "winston";

const {timestamp, combine, prettyPrint, label, json, simple, colorize} = format;

let loggerConfiguration = {
   transports: [
      new transports.Console({
         level: process.env.NODE_ENV === "production" ? "error" : "debug"
      }),
      new transports.File({filename: "errors.log", level: "error" })
   ],
   exceptionHandlers: [
      new transports.File({filename: "exceptions.log"})
   ],
   format: combine(
      timestamp(),
      simple()
   )
};

if(process.env.NODE_ENV !== "production") {
   loggerConfiguration.transports.push(
      new transports.Console({
      level: "error"
   }));
   loggerConfiguration.exceptionHandlers.push(new transports.Console())
}

const logger = createLogger(loggerConfiguration)

logger.exitOnError = false;

export {logger as default};