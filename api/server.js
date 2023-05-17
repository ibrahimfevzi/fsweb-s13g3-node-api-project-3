const express = require("express");
const userRouter = require("./users/users-router");

const server = express();

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.use(express.json());

server.use("/api/users", userRouter); // <--- burası önemli, users-router.js dosyasını buraya bağlıyoruz

server.get("/", (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
