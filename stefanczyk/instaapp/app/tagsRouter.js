import { tags } from "./model.js"
import { convertedTags } from "./model.js"
import { tagsController } from "./tagsController.js";
import { getRequestData } from "./getRequestData.js";

const tagsRouter = async (req, res) => {
    if (req.url == "/api/tags/raw" && req.method == "GET") {
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(tags));
    }
    if (req.url == "/api/tags" && req.method == "GET") {
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(convertedTags));
    }
    if (req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET") {
        let array = req.url.split("/")
        const id = array[array.length - 1]
        const tag = tagsController.getone(convertedTags, parseInt(id))

        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(tag));
    }
    if (req.url == "/api/tags" && req.method == "POST") {
        const data = await getRequestData(req)
        console.log(data);


    }
}

export { tagsRouter }