import { LoggingWinston } from "@google-cloud/logging-winston";
import winston, { format } from "winston";
const envType = process.env.node_env || "local";
console.log(`env type -->`, process.env.node_env || `local`);

const loggingWinston = new LoggingWinston();

const options = {
  file: {
    level: "info",
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
    ),
    handleExceptions: true,
    exitOnError: true,
  },
  console: {
    level: "info",
    format: format.combine(
      format.colorize(),
      // format.errors({ stack: true }),
      // format.splat(),
      // format.json(),
      format.simple(),
    ),
    handleExceptions: true,
    exitOnError: true,
  },
};

// Create a Winston logger that streams to Stackdriver Logging.
// Logs will be written to: "projects/PROJECT_ID/logs/winston_log".
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    // Add Stackdriver Logging.
    loggingWinston,
  ],
});

// We use this for logging morgan messages.
export class LoggerStream {
  public write(message, encoding) {
    logger.info(message.trim());
  }
}

export default logger;
