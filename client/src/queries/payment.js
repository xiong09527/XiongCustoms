import { gql } from "@apollo/client";


const GET_PAYMENTS = gql`
  query Payments($adminId: ID!) {
    payments(adminId: $adminId) {
      id
      paymentId
      userId
      amount
      status
      email
      paid
      amount_captured
      city
      country
      line1
      postCode
      name
      receipt_url
      seen
      createdAt
    }
  }
`;

const GET_PAYMENT = gql`
  query getPayment($adminId: ID!, $paymentId: ID!) {
    payment(adminId: $adminId, paymentId: $paymentId) {
      id
      paymentId
      userId
      amount
      status
      email
      paid
      amount_captured
      city
      country
      line1
      postCode
      name
      receipt_url
      seen
      createdAt
    }
  }
`;

export { GET_PAYMENTS, GET_PAYMENT };
