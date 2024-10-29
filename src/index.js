const http = require("http");
const { URL } = require("url");

const bodyParser = require("./helpers/bodyParser");
const routes = require("./routes");

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);
  console.log(
    `Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`,
  );

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split("/").filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === pathname && routeObj.method === request.method,
  );

  response.send = (statusCode, body) => {
    response.writeHead(statusCode, { "Content-type": "text/html" });
    response.end(JSON.stringify(body));
  };

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams); // Converte um Iterator em um Objeto
    request.params = { id };

    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      console.log("request");
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    response.send(404, `Cannot ${request.method} in ${pathname}`);
  }
});

server.listen(3000, () =>
  console.log("🔥 Server started at http://localhost:3000"),
);
