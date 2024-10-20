function bodyParser(request, callback) {
  let body = "";

  // O evento "data" do objeto request é disparado sempre que um novo pedaço de
  // dados (chunk) do body da requisição é recebido.
  // O chunk representa uma parte dos dados recebidos.
  // Como os dados podem ser grandes, eles chegam em partes.
  request.on("data", (chunk) => {
    body += chunk;
  });

  // O evento "end" é disparado quando todos os dados do corpo foram recebidos.
  request.on("end", () => {
    body = JSON.parse(body);
    request.body = body;
    callback();
  });
}

module.exports = bodyParser;
