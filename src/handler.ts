import { object, string, safeParse } from "valibot";
import { Logger } from "@aws-lambda-powertools/logger";

const logger = new Logger();
const eventSchema = object({ foo: string() });

export const handler = async (event: unknown) => {
  logger.info("event", { event });
  const result = safeParse(eventSchema, event);
  if (!result.success) {
    logger.error("invalid event", result);
    return {
      status: 400,
      body: JSON.stringify(result.error),
    };
  }
  return { status: 200, body: JSON.stringify(result) };
};
