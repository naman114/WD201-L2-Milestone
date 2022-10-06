const fs = require("fs");
const http = require("http");

const args = require("minimist")(process.argv.slice(2));

const PORT = args["port"] ?? 3000;

http
  .createServer(function (request, response) {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    let stream;
    switch (url) {
      case "/project":
        stream = fs.createReadStream("project.html");
        break;
      case "/registration":
        stream = fs.createReadStream("registration.html");
        break;
      default:
        stream = fs.createReadStream("home.html");
        break;
    }
    stream.pipe(response);
  })
  .listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`);
  });
