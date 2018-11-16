import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// routers
import indexRoutes from "../src/routes/index.js";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

// Using router
class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              {indexRoutes.map((prop, key) => {
                return <Route path={prop.path} key={key} component={prop.component}/>;
              })}
            </Switch>
          </Router>
        </ApolloProvider>
    );
  }
}

export default App;
