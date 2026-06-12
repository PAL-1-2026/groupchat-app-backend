import {globalErrorHandler} from '@/errors/globalErrorHandler';
import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import cookierParser from 'cookie-parser';
import logger from '@/libraries/logger/winston';
import router from "@/routers/router.ts";
import {initSocket} from "@/libraries/socket/socket.ts";

require('dotenv').config();


const app = express();
const port = 8080;


app.use(bodyParser.json());
app.use(cookierParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://groupchat-kabw.akbarfikri.my.id",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api', router);

app.use(globalErrorHandler);

const server = app.listen(port, () => {
    logger.info(`listening on port ${port}`);
});

initSocket(server);
