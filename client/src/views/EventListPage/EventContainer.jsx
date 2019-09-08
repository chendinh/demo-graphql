import React from "react";
import { graphql, compose, Mutation } from "react-apollo";
// import local files
import { getEventsQuery, addEventMutation } from "./queries/QEvent.js";
import { getCompaniesQuery } from "./queries/QCompany.js";
import EventPresentation from "./EventPresentation";

class EventContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventName: "",
      dateFrom: "",
      dateEnd: "",
      description: "",
      companyID: ""
    }
  }

  handleChangeInput = e => {
    const { name, type, value } = e.target;
    console.log(name, "-", type, "-", value)
    this.setState({
      [name]: value
    })
  }

  render() {
    // Get results from graph API as props
    let eventsQuery = this.props.getEventsQuery;
    let companiesQuery = this.props.getCompaniesQuery; // not use yet
    let eventFields = this.state;
    return (
      <Mutation mutation={addEventMutation} variables={this.state}>
        {(CreateEventFunction, { loading, error }) => (
          <EventPresentation
            eventsQuery={eventsQuery}
            companiesQuery={companiesQuery}
            eventFields={eventFields}
            handleChangeInput={this.handleChangeInput}
            //For Mutation
            CreateEventFunction={CreateEventFunction}
            isLoading={loading}
            error={error}
          />
        )}
      </Mutation>
    )
  }
}

export default 
  compose(
    // we can set new name for below Queries
    graphql(getEventsQuery, { name: "getEventsQuery", options: { pollInterval: 5000 } }),
    graphql(getCompaniesQuery, { name: "getCompaniesQuery" }),
    graphql(addEventMutation, { name: "addEventMutation" })
  )(EventContainer);