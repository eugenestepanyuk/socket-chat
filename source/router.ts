import { Router } from "express";
import * as Controller from "./controllers";

export const router = Router();

for (const controller of [Controller]) {
  router.use(controller.path, controller.instance);
}
