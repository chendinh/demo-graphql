import React from "react";
// import local file
import "./CSS/EventListCSS.css";
import EventList from "./EventList.jsx";

class EventPresentation extends React.Component {
  render() {
    const { 
      eventsQuery, 
      companiesQuery, 
      eventFields, 
      handleChangeInput, 
      CreateEventFunction,
      error
    } = this.props;
    // get Company List from Query Graph API
    // if(companiesQuery.loading){
    //   console.log("Companies loading...");
    // } else {
    //   console.log("companies:", companiesQuery);
    // }
    return (
      <div className="body">
        <div name="Title" className="Title">
          Event List
        </div>
        <p className="guide">Click below events to see infomation of company</p>
        <EventList 
          eventsQuery={eventsQuery} 
          companiesQuery={companiesQuery}
          eventFields={eventFields}
          handleChangeInput={handleChangeInput}
          //for Mutation
          CreateEventFunction={CreateEventFunction}
          error={error}
        />
      </div>
    )
  }
}

export default EventPresentation;