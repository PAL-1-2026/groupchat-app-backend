import {globalErrorHandler} from '@/errors/globalErrorHandler';
import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import cookierParser from 'cookie-parser';
import logger from '@/libraries/logger/winston';
import router from "@/routers/router.ts";

require('dotenv').config();


const app = express();
const port = 8080;


app.use(bodyParser.json());
app.use(cookierParser());

app.use(
    cors({
        origin: "*",
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
