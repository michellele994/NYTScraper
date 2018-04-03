import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../../components/Grid";
import { Container } from "../../components/Grid";
import { List, ListItem, SaveBtn, DeleteBtn } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    saved: [],
    topic: "",
    startdate: "",
    enddate: ""
  };

  componentDidMount() {
    this.loadSavedArticles();
  }

  loadArticles = () => {
    API.getArticles(this.state.topic)
      .then(res =>
        {
        this.setState({ articles: res.data.docs, topic: "", startdate: "", enddate: "" })
        console.log(res.data.docs);
        }
      )
      .catch(err => console.log(err));
  };
  loadSavedArticles = () => {
    API.getSaved()
      .then(res =>
      {
        this.setState({saved: res.data});
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }
  deleteArticle = (id) => {
    console.log("Yo I should be an ID" +id);
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };
  saveArticle = (articleUrl, articleTitle) =>
  {
    API.saveArticle(articleUrl, articleTitle)
      .then(res=> this.loadSavedArticles())
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      this.loadArticles();
    }
  };

  render() {
    return (
      <Container>
      <div className="text-center">
              <Jumbotron>
                <h1 className ="display-4 font-weight-bold">New York Times Article Scrubber</h1>
                <p className="lead">Search for and annotate articles of interest!</p>
              </Jumbotron>
              <div className = "card">
                <div className ="card-header">
                  Search
                </div>
                <form>
                <Input
                  value={this.state.topic}
                  onChange={this.handleInputChange}
                  name="topic"
                  placeholder="Topic (Required)"
                />
                <Input
                  value={this.state.startdate}
                  onChange={this.handleInputChange}
                  name="startdate"
                  placeholder="Start Year (Optional)"
                />
                <Input
                  value={this.state.enddate}
                  onChange={this.handleInputChange}
                  name="enddate"
                  placeholder="End Year (Optional)"
                />
                <FormBtn
                  disabled={!(this.state.topic)}
                  onClick={this.handleFormSubmit}
                >
                  Search
                </FormBtn>
              </form>
            </div>
            <div className = "card">
              <div className ="card-header">
              Results
              </div>
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.slice(0,5).map(article => (
                    <ListItem
                    weburl={article.web_url || ""}
                    title={article.headline.main || ""}
                    >
                    <SaveBtn
                    // weburl={article.web_url || ""}
                    // title={article.headline.main || ""}
                    onClick={()=>this.saveArticle(article.web_url, article.headline.main)}
                    >
                      Save
                    </SaveBtn>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h5>No Results to Display</h5>
              )}
            </div>
            <div className = "card">
              <div className ="card-header">
              Saved Articles
              </div>
              {this.state.saved.length ? (
                <List>
                  {this.state.saved.map(savedArticle => (
                    <ListItem
                    weburl={savedArticle.url || ""}
                    title={savedArticle.title || ""}>
                    <DeleteBtn
                    // id={savedArticle._id || ""}
                    onClick={() => this.deleteArticle(savedArticle._id)}
                    
                    >
                      Remove
                    </DeleteBtn>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h5>No Saved Articles</h5>
              )}
            </div>
            
    </div>
    </Container>
    );
  }
}

export default Articles;
