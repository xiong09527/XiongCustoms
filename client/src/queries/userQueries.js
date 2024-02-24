import { gql } from "@apollo/client";

const GET_USERS = gql`
  query users($adminId: ID!) {
    users(adminId: $adminId) {
      name
      id
      admin
    }
  }
`;

export { GET_USERS };
