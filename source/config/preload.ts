import { config } from "dotenv";
import { normalize, join } from "path";

config({ path: normalize(join(__dirname, ".env")) });
