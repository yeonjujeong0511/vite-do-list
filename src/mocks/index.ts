import { setupWorker } from "msw/browser";
import { todoHandlers } from "./todo/handler";

export const worker = setupWorker(...todoHandlers);
