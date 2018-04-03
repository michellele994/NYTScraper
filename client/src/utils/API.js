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

// axios.get('/api/items', {port: 9091}).then(...

// import axios from "axios";

// export default {
//   // Gets all books
//   getBooks: function() {
//     return axios.get("/api/books");
//   },
//   // Gets the book with the given id
//   getBook: function(id) {
//     return axios.get("/api/books/" + id);
//   },
//   // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
//   // Saves a book to the database
//   saveBook: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
// };
