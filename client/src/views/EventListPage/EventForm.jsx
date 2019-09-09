import React from "react";
import { Fragment } from "react";
import { updateEventMutation } from "./queries/QEvent.js";
import { graphql, Mutation } from "react-apollo";

class EventForm extends React.Component {
  state = {
    addEvent: false,
    id: "",
    eventName: "",
    dateFrom: "",
    dateEnd: "",
    description: "",
  }

  componentDidMount() {
    if(this.props.eventName){
      this.setState({eventName:this.props.eventName})
    }
    if(this.props.dateFrom){
      this.setState({dateFrom:this.props.dateFrom})
    }
    if(this.props.dateEnd){
      this.setState({dateEnd:this.props.dateEnd})
    }
    if(this.props.dateEnd){
      this.setState({description:this.props.description})
    }
  }

  handleAddEvent = () => {
    this.setState({
      addEvent: !this.state.addEvent
    })
  }

  handleChangeInputUpdate = e => {
    const { name, type, value } = e.target;
    console.log(name, "-", type, "-", value)
    this.setState({
      [name]: value
    })
  }
  
  render() {
    const { addEvent } = this.state;
    const { companiesQuery, eventFields, handleChangeInput, CreateEventFunction, error } = this.props;
    const { handeShowUpdateForm } = this.props;
    const Label = props => (
      <div className="Label">
        {props.content}
      </div>
    )

    const { updateEvent } = this.props;
    return (
      <Fragment>
        {
          updateEvent && !addEvent
          ?
            <Mutation mutation={updateEventMutation} variables={this.state}>
              {(UpdateEventFunction, { loading, error }) => (
                !loading
                ?
                <div className="item add-event-open">
                  <div className="event-form">
                    <div className="InputBox">
                      <Label content="Eventname"/>
                      <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        placeholder={this.props.eventName ? this.props.eventName: ""}
                        value={this.state.eventName}
                        onChange={this.handleChangeInputUpdate}
                        className="Input"
                      />
                    </div>
                    <div className="InputBox">
                      <Label content="Description"/>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder={this.props.description ? this.props.description: ""}
                        value={this.state.description}
                        onChange={this.handleChangeInputUpdate}
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
                        onChange={this.handleChangeInputUpdate}
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
                        onChange={this.handleChangeInputUpdate}
                    />
                    </div>
                    <button 
                      onClick={this.props.handeShowUpdateForm}  
                      className="Button-Add"
                      style={{ fontSize: 15, marginLeft: 0, marginRight: 0, width: "50%" }}
                    >
                      Back
                    </button>
                    <button 
                      onClick={async e => {
                        e.preventDefault();
                        await this.setState({
                          id: this.props.id
                        })
                        const res = await UpdateEventFunction()
                        console.log("res: ",res)
                        if(!error) { 
                          console.log("no error for updating")
                          handeShowUpdateForm()
                        }
                      }}
                      className="Button-Add"
                      style={{ fontSize: 15, marginLeft: 0, marginRight: 0, width: "50%" }}
                    >
                      Update
                    </button>
                  </div>
                </div>
                : 
                  <div 
                    className="Loading"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    Loading...
                  </div>
              )}
            </Mutation>
          : null
        }
        {
          addEvent && !updateEvent
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
            !updateEvent
            ?
              <div 
                onClick={this.handleAddEvent} 
                className="item add-event-close"
              />
            :
            null
        }
      </Fragment>
    )
  }
}

export default graphql(updateEventMutation, { name: "updateEventMutation" })(EventForm);