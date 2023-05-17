const express = require("express");
const userMd = require("../middleware/middleware");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Users.getById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
// istek gövdesini doğrulamak için ara yazılım gereklidir.
router.post("/", userMd.validatePost, async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await Users.insert({ name });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});
// YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
// user id yi doğrulayan ara yazılım gereklidir
// ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
router.put(
  "/:id",
  userMd.validateUserId,
  userMd.validatePost,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const user = await Users.update(id, { name });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

// SON SİLİNEN USER NESNESİ DÖNDÜRÜN
// user id yi doğrulayan bir ara yazılım gereklidir.
router.delete("/:id", userMd.validateUserId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Users.remove(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});
// USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
// user id yi doğrulayan bir ara yazılım gereklidir.
router.get("/:id/posts", userMd.validateUserId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Users.getUserPosts(id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

// YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
// user id yi doğrulayan bir ara yazılım gereklidir.
// ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
router.post(
  "/:id/posts",
  userMd.validateUserId,
  userMd.validatePost,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const post = await Posts.insert({ user_id: id, text });
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }
);

// routerı dışa aktarmayı unutmayın

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Users router yönlendirmesinde bir şeyler yanlış gitti.",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
