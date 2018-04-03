const axios = require("axios");
const router = require("express").Router();
const articlesController = require("../controllers/articlesController");

router.get("/articles/", (req, res) => {
  axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json?apikey=5ebc6c97b9d54381b6f387bfc06b79dd&q="+req.query.query)
    .then(({ data: { response } }) => res.json(response))
    .catch(err => res.status(422).json(err));
});
router
  .route("/articles/saved/")
  .get(articlesController.findAll)
  .post(articlesController.save);
router
  .route("/articles/saved/:id")
  .get(articlesController.findById)
  .delete(articlesController.remove);

module.exports = router;
