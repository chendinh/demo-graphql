import React from "react";
import { graphql, compose, Mutation } from "react-apollo";

import EventForm from "./EventForm.jsx";
import "./CSS/EventListCSS.css";
import { getCompanyQuery } from "./queries/QCompany";
import { deleteEventMutation } from "./queries/QEvent.js";

class EventItem extends React.Component {
  state = {
    showCompanyInfo: false,
    showButtons: false,
    showUpdateForm: false,
    DeletedEventID: '',
  }

  handleShowInfo = () => {
    this.setState({
      showCompanyInfo: !this.state.showCompanyInfo,
    })
  }

  handleShowButtons = () => {
    this.setState({
      showButtons: !this.state.showButtons,
    })
  }

  handeShowUpdateForm = () => {
    this.setState({
      showUpdateForm: !this.state.showUpdateForm,
    })
  }

  render() {
    let {
      id,
      eventName,
      description,
      dateFrom,
      dateEnd,
      companyName
    } = this.props;
    let { showCompanyInfo, showButtons, showUpdateForm } = this.state

    const { getCompanyQuery } = this.props;
    let companyData;
    if(getCompanyQuery.loading) {
      console.log("loading company: ", companyName)
    } else {
      companyData = getCompanyQuery.company
      //console.log(companyData.events);
    }

    return (
      showUpdateForm
      ?
        <EventForm 
          id={id} 
          eventName={eventName}
          description={description}
          dateFrom={dateFrom}
          dateEnd={dateEnd}
          updateEvent={true} 
          handeShowUpdateForm={this.handeShowUpdateForm}
        />
      :
        !showCompanyInfo 
        ?
        <div 
          onClick={this.handleShowButtons} 
          className="event item"
        >
          { 
            !showButtons
            ?
              <span>
                <h2 className="title-name">{eventName}</h2>
                <p>From: {dateFrom}</p>
                <p>To: {dateEnd}</p>
                <p>Description: {description}</p>
                <p>Company: {companyName}</p>
              </span> 
            :
              <span>
                <Mutation mutation={deleteEventMutation} variables={{ id: id }}>
                  {(DeleteEventMutation, { loading, error }) => (
                    <button
                      className="Button-Delete" 
                      onClick={async e => {
                        e.preventDefault()
                        const res = await DeleteEventMutation()
                        console.log("res: ",res)
                        if(!error) { 
                          console.log("no error")
                        }
                      }}>
                      DELETE 
                    </button>
                  )}
                </Mutation>
                <button
                  className="Button-Update" 
                  onClick={async e => {
                    e.preventDefault()
                    this.handeShowUpdateForm()
                    console.log("show update form successfully")
                  }}>
                  UPDATE 
                </button>
                <button
                  className="Button-Next" 
                  onClick={async e => {
                    e.preventDefault()
                    this.handleShowInfo()
                  }}>
                  > 
                </button>
                <h2 className="title-name">{eventName}</h2>
                <p>From: {dateFrom}</p>
                <p>To: {dateEnd}</p>
                <p>Description: {description}</p>
                <p>Company: {companyName}</p>
            </span> 
          }
        </div>
        :
        <div 
          onClick={this.handleShowInfo} 
          className="company item"
        >
          <span>
            <p className="title-name">{companyData.companyName}</p>
            <p>Establish Year: {companyData.establishYear}</p>
            <p>Number Of Staff: {companyData.numberOfStaff}</p>
            <p>Location: {companyData.location}</p>
            <h2>Events: </h2> 
            {
              companyData.events.map((event, index) => 
                <p key={index}> {event.eventName}</p>
              )
            }
          </span>
        </div>
    )
  }
}

export default 
  compose(
    graphql(getCompanyQuery, {
      options: (props) => {
          return {
              variables: {
                  id: props.companyID
              }
          }
      },
      name: "getCompanyQuery" 
    }),
    graphql(deleteEventMutation, { name: "deleteEventMutation" })
  )(EventItem);
