import { gql } from "apollo-boost";

const getEventsQuery = gql`
  {
    events{
      id
      eventName
      description
      dateFrom
      dateEnd
      companies {
        id
        companyName
        location
        numberOfStaff
        establishYear
      }
    }
  }
`;

const addEventMutation = gql`
    mutation AddEvent(
      $eventName: String!,
      $dateFrom: Date!,
      $dateEnd: Date!,
      $description: String!,
      $companyID: String!
    ){
      addEvent(
        eventName: $eventName,
        dateFrom: $dateFrom,
        dateEnd: $dateEnd,
        description: $description,
        companyID:  $companyID
      ){
        eventName
        dateFrom
        dateEnd
        description
        companies {
          companyName
          location
          numberOfStaff
          establishYear
        }
      }
    }
`;

const deleteEventMutation = gql`
    mutation deleteEvent(
      $id: String!,
    ){
      deleteEvent(
        id: $id,
      ){
        eventName
      }
    }
`;

export { getEventsQuery, addEventMutation, deleteEventMutation };
