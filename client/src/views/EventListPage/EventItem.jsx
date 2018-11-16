import React from "react";
import { graphql } from "react-apollo";

import "./CSS/EventListCSS.css";
import { getCompanyQuery } from "./queries/QCompany";

class EventItem extends React.Component {
  state = {
    showCompanyInfo: false,
  }

  handleShowInfo = (event) => {
    this.setState({
      showCompanyInfo: !this.state.showCompanyInfo,
    })
  }

  render() {
    let {
      eventName,
      description,
      dateFrom,
      dateEnd,
      companyName
    } = this.props;
    let { showCompanyInfo } = this.state
    const { getCompanyQuery } = this.props;
    let companyData;
    if(getCompanyQuery.loading) {
      console.log("loading company: ", companyName)
    } else {
      companyData = getCompanyQuery.company
      console.log(companyData.events);
    }
    return (
      <div 
        onClick={this.handleShowInfo} 
        className={showCompanyInfo ? "company item" : "event item"}
      >
        { 
          !showCompanyInfo 
          ?
            <span>
              <p className="title-name">{eventName}</p>
              <p>From: {dateFrom}</p>
              <p>To: {dateEnd}</p>
              <p>Description: {description}</p>
              <p>Company: {companyName}</p>
            </span> 
          :
            <span>
              <p className="title-name"> {companyData.companyName}</p>
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
        }
      </div>
    )
  }
}

export default graphql(getCompanyQuery, {
  options: (props) => {
      return {
          variables: {
              id: props.companyID
          }
      }
  },
  name: "getCompanyQuery" 
})(EventItem);
