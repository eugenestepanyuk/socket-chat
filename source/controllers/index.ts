import { Router, Request, Response } from "express";
import { normalize, join } from "path";
// import validateMiddleware from "../middlewares/validate";
// import licenseService from "../services/licenses";

export const path: string = "/";
export const instance: Router = Router();

async function getChatFile(_request: Request, response: Response) {
  response.sendFile(
    normalize(join(__dirname, "..", "..", "public", "index.html"))
  );
}

// async function getFile(request: Request, response: Response) {
//   const data = await licenseService.getFile(request.body);
//   return response.json(data);
// }

instance.get("/", getChatFile);
// instance.post("/get-license/", validateMiddleware, getLicense);
