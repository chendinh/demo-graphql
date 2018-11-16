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
      $dateFrom: String!,
      $dateEnd: String!,
      $address: String!, 
      $description: String!,
      $companyID: ID
    ){
      addEvent(
        eventName: $eventName,
        dateFrom: $dateFrom,
        dateEnd: $dateEnd,
        address: $address, 
        description: $description,
        companyID:  $companyID
      ){
        eventName
        dateFrom
        dateEnd
        address
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

export { getEventsQuery, addEventMutation };
