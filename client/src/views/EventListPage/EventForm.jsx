import React from "react";
import { Fragment } from "react";

class EventForm extends React.Component {
  state = {
    addEvent: false
  }

  handleAddEvent = () => {
    this.setState({
      addEvent: !this.state.addEvent
    })
  }
  
  render() {
    const { addEvent } = this.state;
    const { companiesQuery, eventFields, handleChangeInput, CreateEventFunction, error } = this.props;

    const Label = props => (
      <div className="Label">
        {props.content}
      </div>
    )
    return (
      <Fragment>
        {
          addEvent 
          ?
            <div className="item add-event-open">
              <div className="event-form">
                <div className="InputBox">
                  <Label content="Eventname"/>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={eventFields.eventName}
                    onChange={handleChangeInput}
                    className="Input"
                  />
                </div>
                <div className="InputBox">
                  <Label content="Description"/>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={eventFields.description}
                    onChange={handleChangeInput}
                    className="Input"
                  />
                </div>
                <div className="InputBox">
                  <Label content="Date From"/>
                  <input 
                    className="InputDate" 
                    type="date" 
                    name="dateFrom" 
                    min="Date"
                    data-date-format="YYYY MMMM DD"
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="InputBox">
                  <Label content="Date To"/>
                  <input 
                    className="InputDate" 
                    type="date" 
                    name="dateEnd" 
                    min="Date"
                    data-date-format="YYYY MMMM DD"
                    onChange={handleChangeInput}
                />
                </div>
                <div className="InputBox">
                  <Label content="Company"/>
                  <select 
                    className="OptionCompanies"
                    onChange={handleChangeInput}
                    placeholder={eventFields.companyID}
                    name="companyID"
                  >
                    <option value="selected">Select</option>
                    {
                      companiesQuery.companies.map((company, index) => 
                        <option 
                          key={index} 
                          value={company.id}
                        >
                          {company.companyName}
                        </option>
                      )
                    }
                  </select>
                </div>
                <button 
                  onClick={this.handleAddEvent}  
                  className="Button-Add"
                >
                  Back
                </button>
                <button 
                  className="Button-Add"
                  onClick={async e => {
                    e.preventDefault()
                    const res = await CreateEventFunction()
                    console.log("res: ",res)
                    if(!error) { 
                      console.log("no error")
                      this.handleAddEvent() 
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          :
            <div 
              onClick={this.handleAddEvent} 
              className="item add-event-close"
            />
        }
      </Fragment>
    )
  }
}

export default EventForm;