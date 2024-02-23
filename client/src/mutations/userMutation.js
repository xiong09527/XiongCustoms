import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation registerUser(
    $avatar: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      avatar: $avatar
      name: $name
      email: $email
      password: $password
    ) {
      id
      avatar
      name
      email
      admin
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      avatar
      name
      email
      admin
      token
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($adminId: ID!, $userId: ID!) {
    deleteUser(adminId: $adminId, userId: $userId) {
      id
      name
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($adminId: ID!, $userId: ID!) {
    updateUser(adminId: $adminId, userId: $userId) {
      name
      admin
      id
    }
  }
`;

export { REGISTER_USER, LOGIN_USER, DELETE_USER, UPDATE_USER };
