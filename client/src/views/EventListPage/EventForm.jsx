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
    const { companiesQuery } = this.props;

    const Input = props => (
      <input 
        type={props.type}
        placeholder={props.placeholder}
        className="Input"
      />
    )

    const InputDate = props => (
      <input 
        className="InputDate" 
        type="date" 
        name="Date" 
        min="Date"
      />
    )

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
                  <Input
                    type="text"
                    placeholder=""
                  />
                </div>
                <div className="InputBox">
                  <Label content="Description"/>
                  <Input
                    type="text"
                    placeholder=""
                  />
                </div>
                <div className="InputBox">
                  <Label content="Date From"/>
                  <InputDate
                    type="text"
                    name="DateFrom"
                  />
                </div>
                <div className="InputBox">
                  <Label content="Date To"/>
                  <InputDate
                    type="text"
                    name="DateTo"
                  />
                </div>
                <div className="InputBox">
                  <Label content="Company"/>
                  <select 
                    defaultValue="selected"
                    className="OptionCompanies"
                  >
                    <option value="selected">Select</option>
                    {
                      companiesQuery.companies.map((company, index) => 
                        <option 
                          key={index} 
                          value={company.companyName}
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
                <button className="Button-Add">Add</button>
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