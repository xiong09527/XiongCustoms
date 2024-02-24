import { gql } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation sendMessage(
    $name: String!
    $subject: String!
    $email: String!
    $userId: String!
    $text: String!
  ) {
    sendMessage(
      name: $name
      subject: $subject
      email: $email
      userId: $userId
      text: $text
    ) {
      name
      email
      subject
      text
      userId
    }
  }
`;

const DELETE_MESSAGE = gql`
  mutation DeleteMessage($messageId: ID!, $adminId: ID!) {
    deleteMessage(messageId: $messageId, adminId: $adminId) {
      name
      text
      id
    }
  }
`;

export { SEND_MESSAGE, DELETE_MESSAGE };
