import { gql } from "@apollo/client";

const GET_MESSAGES = gql`
  query getMessages($adminId: ID!) {
    messages(adminId: $adminId) {
      name
      email
      subject
      text
      createdAt
      seen
      id
    }
  }
`;

const GET_MESSAGE = gql`
  query message($adminId: ID!, $messageId: ID!) {
    message(adminId: $adminId, messageId: $messageId) {
      name
      email
      subject
      text
      createdAt
      seen
    }
  }
`;

export { GET_MESSAGES, GET_MESSAGE };
