import * as zod from "zod";
import { Logger } from "@aws-lambda-powertools/logger";

const logger = new Logger();
const eventSchema = zod.object({ foo: zod.string() });

export const handler = async (event: unknown) => {
  const { foo } = eventSchema.parse(event);
  logger.info("foo", { foo });
  return { foo };
};
