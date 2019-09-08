import { gql } from "apollo-boost";
// Choose which field we want

const getCompaniesQuery = gql`
  {
    companies{
      id
      companyName
      establishYear
      numberOfStaff
      location
      events{
        id
        eventName
        dateFrom
      }
    }
  }
`;

const getCompanyQuery = gql`
  query GetCompany($id: ID) {
    company(id: $id ){
      id
      companyName
      establishYear
      numberOfStaff
      location
      events{
        id
        eventName
        dateFrom
      }
    }
  }
`;

export { getCompaniesQuery, getCompanyQuery };
