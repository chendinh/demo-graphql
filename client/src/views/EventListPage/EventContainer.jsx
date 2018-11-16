import React from "react";
import { graphql, compose } from "react-apollo";
// import local files
import { getEventsQuery } from "./queries/QEvent.js";
import { getCompaniesQuery } from "./queries/QCompany.js";
import EventPresentation from "./EventPresentation";

class EventContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // Get results from graph API
    let eventsQuery = this.props.getEventsQuery;
    let companiesQuery = this.props.getCompaniesQuery; // not use yet
    return (
      <EventPresentation
        eventsQuery={eventsQuery}
        companiesQuery={companiesQuery}
      />
    )
  }
}

export default 
  compose(
    // we can set new name for below Queries
    graphql(getEventsQuery, { name: "getEventsQuery" }),
    graphql(getCompaniesQuery, { name: "getCompaniesQuery" }),
  )
(EventContainer);