import { Router, Request, Response, static as expressStatic } from "express";
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

async function getAuth(_request: Request, response: Response) {
  response.sendFile(
    normalize(join(__dirname, "..", "..", "public", "auth.html"))
  );
}

// async function getFile(request: Request, response: Response) {
//   const data = await licenseService.getFile(request.body);
//   return response.json(data);
// }

instance.use(expressStatic(join(__dirname, "..", "..", "public")));
instance.get("/", getChatFile);
instance.get("/auth", getAuth);
// instance.post("/get-license/", validateMiddleware, getLicense);
