import { tags } from "./model"
import { tagsController } from "./tagsController";

const tagsRouter = async (req, res) => {
    if (req.url == "/api/tags/raw" && req.method == "GET") {
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(tags));
    }
    if (req.url == "/api/tags" && req.method == "POST") {

    }
    if (req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET") {

    }
    if (req.url == "/api/tags" && req.method == "POST") {
    }
}

export { tagsRouter }