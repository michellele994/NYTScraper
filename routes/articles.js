const axios = require("axios");
const router = require("express").Router();

router.get("/recipes", (req, res) => {
  axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json?apikey=5ebc6c97b9d54381b6f387bfc06b79dd", { params: req.query })
    .then(({ data: { response } }) => res.json(response))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
