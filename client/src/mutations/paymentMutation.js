import { gql } from "@apollo/client";

const PAYMENT = gql`
  mutation payment($tokenId: ID!, $amount: Int!) {
    payment(tokenId: $tokenId, amount: $amount) {
      id
      amount
      status
    }
  }
`;

export { PAYMENT };
