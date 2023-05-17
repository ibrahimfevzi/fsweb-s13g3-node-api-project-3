const Users = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );

  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      next({ status: 404, message: "not found" });
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || !name.trim()) {
    next({ status: 400, message: "gerekli name alanı eksik" });
  } else {
    req.name = name.trim();
    next();
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text || !text.trim()) {
    next({ status: 400, message: "gerekli text alanı eksik" });
  } else {
    req.text = text.trim();
    next();
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
