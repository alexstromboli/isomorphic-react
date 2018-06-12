import fs from "fs";
import http from "http";
import { render } from "./serverside";
import { APIImplementation } from "./api/methods";

// change TCP port
var Port: number = 80;

var server = new http.Server ((req,resp) =>
	{
		console.log(req.method + " " + req.url);

		if (req.method == "GET")
		{
			if (req.url.startsWith ("/scripts/"))
			{
				// scripts
				var filePath = req.url.slice(1);
				var stat = fs.statSync(filePath);

				resp.writeHead(200,
				{
					'Content-Length': stat.size
				});

				var readStream = fs.createReadStream(filePath);
				readStream.pipe(resp);
				//resp.end();
			}
			else
			{
				// server-side ReactJS
				render(req.url, Port)
					.then(html =>
					{
						resp.setHeader("Content-Type", "text/html");
						resp.write(html);
						resp.end();
					}, () =>
					{
						resp.writeHead(404);
						resp.end();
					});
			}
		}
		else if (req.method == "POST")
		{
			var mAPI = /^\/api\/(\w+)/.exec(req.url);

			if (!!mAPI)
			{
				var APIMethodName = mAPI[1];

				var JSONData = "";
				req.on("data", data => JSONData += data);
				req.on("end", () =>
				{
					var Data = JSON.parse(JSONData);

					var Result = APIImplementation[APIMethodName] (Data);

					resp.setHeader("Content-Type", "application/json");
					resp.write(JSON.stringify(Result));
					resp.end();
				});
			}
		}
	});

server.listen (Port, "127.0.0.1");

console.log("Server started. Press Ctrl+C to stop.");
