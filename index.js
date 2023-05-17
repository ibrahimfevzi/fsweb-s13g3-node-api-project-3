// require your server and launch it

const server = require("./api/server.js");

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = server;
