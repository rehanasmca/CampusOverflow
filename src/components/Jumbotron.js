import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

class JumbotronData extends Component {
  render = () => {
    return (
      <Jumbotron className="bg-dark text-white">
        <h1>Welcome To Book Shop</h1>
        <blockquote className="blockquote mb-0">
          <p>
            Good Books, Good Friend and a Sleepy Conscience: This is the ideal
            life.
          </p>
          <footer className="blockquote-footer ">Jobsdeed</footer>
        </blockquote>
      </Jumbotron>
    );
  };
}

export default JumbotronData;
