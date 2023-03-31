import "./config/preload";
import express, { Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
// import helmet from "helmet";
import cors from "cors";
import { environment } from "./config";
import { router } from "./router";
import { ErrorCode } from "./types/errorCode";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {});
});

function main() {
  try {
    app
      // .use(helmet())
      .use(cors())
      .use(express.json())
      .use("/", router)
      .all("/*", (_, response: Response) =>
        response.status(404).json({ success: false, error: ErrorCode.notFound })
      );
    httpServer.listen(environment.port, async () => {
      !environment.production
        ? console.log(
            `Server was started up on http://localhost:${environment.port}`
          )
        : null;
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

main();
