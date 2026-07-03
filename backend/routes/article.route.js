const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../config/storage");
const upload = multer({ storage });

const articleController = require("../controllers/article.controller");

// Create article
router.post("/add", upload.single("coverImage"), articleController.createArticle);

// Generate article draft with AI
router.post("/ai/generate", articleController.generateArticleWithAI);

// View all articles
router.get("/viewarticle", articleController.getAllArticles);

// Update article by slug
router.put("/:slug", upload.single("coverImage"), articleController.updateArticle);

// Delete article
router.delete("/:slug", articleController.deleteArticle);

// Update only cover image
router.patch(
  "/:slug/image",
  upload.single("coverImage"),
  articleController.updateCoverImage,
);

// Get related articles
router.get("/related/:slug", articleController.getRelatedArticles);

module.exports = router;

