import React from "react";
import { Fragment } from "react"
import EventItem from "./EventItem.jsx";
import "./CSS/EventListCSS.css";
import EventForm from "./EventForm.jsx";

class EventList extends React.Component {
  render() {
    let { 
      eventsQuery, 
      companiesQuery, 
      eventFields, 
      handleChangeInput, 
      CreateEventFunction,
      error
    } = this.props;
    return(
      <Fragment>
        {
          eventsQuery.loading 
          ?
            <div 
              className="Loading"
              style={{ width: "100%", textAlign: "center" }}
            >
              Loading...
            </div>
          :
          <div className="event-list-container">
            <EventForm 
              companiesQuery={companiesQuery} 
              eventFields={eventFields}
              handleChangeInput={handleChangeInput}
              //For Mutation
              CreateEventFunction={CreateEventFunction}
              error={error}
            />
            {
              eventsQuery.events.map((event, index) => {
                return (
                  <span key={index}>
                    <EventItem
                      index={index}
                      id={event.id}
                      eventName={event.eventName}
                      description={event.description}
                      dateFrom={event.dateFrom}
                      dateEnd={event.dateEnd}
                      companyID={event.companies.id}
                      companyName={event.companies.companyName}
                    />
                  </span>
                )
              })
            }
          </div>
        }
      </Fragment>
    )
  }
}

export default EventList;