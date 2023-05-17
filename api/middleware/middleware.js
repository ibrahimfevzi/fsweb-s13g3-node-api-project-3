const { users } = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );

  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  const user = users.getById(id);
  if (user) {
    req.user = user;
    next();
  } else {
    next({ status: 404, message: "kullanıcı bulunamadı" });
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || !name.trim()) {
    next({ status: 400, message: "gerekli name alanı eksik" });
  }
  req.name = name.trim();
  next();
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text || !text.trim()) {
    next({ status: 400, message: "gerekli text alanı eksik" });
  }
  req.text = text.trim();
  next();
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
