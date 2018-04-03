const axios = require("axios");
const router = require("express").Router();
const articlesController = require("../controllers/articlesController");

router.get("/articles/", (req, res) => {
  let parsed = JSON.parse(req.query.query)
  let query = {
    apikey: "5ebc6c97b9d54381b6f387bfc06b79dd",
    q: parsed.q,
    begin_date: parsed.begin_date,
    end_date: parsed.end_date
  }
  console.log(req.query.query);
  console.log(parsed);
  console.log(query);
  axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {params: query})
    .then(({ data: { response } }) => {res.json(response)})
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
