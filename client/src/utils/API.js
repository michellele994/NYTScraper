import axios from "axios";


export default {
  getArticles: function(query) {
    return axios.get("/api/articles/", {params: {query}});
  },
  getSaved: function() {
    return axios.get("/api/articles/saved/");
  },
  saveArticle: function(articleUrl, articleTitle) {
    var savingArticle = {
      title: articleTitle,
      date: new Date(Date.now()),
      url: articleUrl
    }
    return axios.post("/api/articles/saved/", savingArticle);
  },
  getArticle: function(id) {
    return axios.get("/api/articles/saved/" + id);
  },
  deleteArticle: function(id) {
    console.log(id);
    return axios.delete("/api/articles/saved/"+id);
  }
};
