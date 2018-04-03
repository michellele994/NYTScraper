import React from "react";
import { Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";

const NoMatch = () => (
  <Container fluid>
    <div className="row">
      <div className="col-md-12">
        <Jumbotron>
          <h1>404 Page Not Found</h1>
        </Jumbotron>
      </div>
    </div>
  </Container>
);

export default NoMatch;
