// Os dados recebidos no body de uma requisição são muito grandes e chegam em
// pequenos pedaços chamados chunks.
function bodyParser(request, callback) {
  let body = "";

  // O evento "data" do objeto request é disparado sempre que um chunk
  // do body da requisição é recebido.
  request.on("data", (chunk) => {
    body += chunk;
  });

  // O evento "end" é disparado quando todos os chunks do body foram recebidos.
  request.on("end", () => {
    console.log("end", body);
    body = JSON.parse(body);
    request.body = body;
    callback();
  });
}

module.exports = bodyParser;
