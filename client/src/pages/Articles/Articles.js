import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
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
    let topicFix = (this.state.topic).split(' ').join('+');
    API.getArticles({
      q: topicFix,
      begin_date: this.state.startdate,
      end_date: this.state.enddate
    })
      .then(res =>
        {
        this.setState({ articles: res.data.docs, topic: "", startdate: "", enddate: "" })
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
    if (this.state.topic && this.state.startdate && this.state.enddate) {
      this.loadArticles();
    }
  };

  render() {
    return (
      <Container>
      <div className="text-center">
              <Jumbotron>
                <h1 className ="display-4 font-weight-bold">New York Times Article Scrubber</h1>
                <p className="lead">Search for articles of interest!</p>
              </Jumbotron>
              <div className = "card">
                <div className ="card-header">
                  Search
                </div>
                <form>
                <Input
                  labelname="Topic"
                  value={this.state.topic}
                  onChange={this.handleInputChange}
                  name="topic"
                  placeholder="Topic (Required)"
                />
                <Input
                  labelname="Start Date"
                  value={this.state.startdate}
                  onChange={this.handleInputChange}
                  name="startdate"
                  placeholder="Start Year (Required: YYYYMMDD)"
                />
                <Input
                  labelname="End Date"
                  value={this.state.enddate}
                  onChange={this.handleInputChange}
                  name="enddate"
                  placeholder="End Year (Required: YYYYMMDD)"
                />
                <FormBtn
                  disabled={!(this.state.topic && this.state.startdate && this.state.enddate)}
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
                    key={article._id}
                    weburl={article.web_url || ""}
                    title={article.headline.main || ""}
                    >
                    <SaveBtn
                    onClick={()=>this.saveArticle(article.web_url, article.headline.main)}
                    >
                      Save
                    </SaveBtn>
                    <div className="row">
                      <div className="col-md-12">
                      Published on {(article.pub_date).slice(0,10)}
                      </div>
                    </div>
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
                    key={savedArticle._id}
                    weburl={savedArticle.url || ""}
                    title={savedArticle.title || ""}>
                    <DeleteBtn
                    onClick={() => this.deleteArticle(savedArticle._id)}
                    >
                      Remove
                    </DeleteBtn>
                    <div className="row">
                      <div className="col-md-12">
                      Saved on {(savedArticle.date).slice(0,10)}
                      </div>
                    </div>
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

