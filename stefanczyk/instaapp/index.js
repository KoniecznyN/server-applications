import { createServer } from 'http';
import imageRouter from "./app/router.js";
import { tagsRouter } from './app/tagsRouter.js';
import 'dotenv/config'

http.createServer(async (req, res) => {
    if (req.url.search("/api/photos") != -1) {
        await imageRouter(req, res)
    } else if (req.url.search("/api/tags") != -1) {
        await tagsRouter(req, res)
    }
})
    .listen(process.env.APP_PORT, () => console.log(`listen on ${process.env.APP_PORT}`))
