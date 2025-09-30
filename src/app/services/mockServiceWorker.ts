import { setupWorker } from "msw/browser";
import { handlers } from "../../tests/__mocks__/handlers";

export const worker = setupWorker(...handlers);
