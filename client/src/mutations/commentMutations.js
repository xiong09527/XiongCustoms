import { gql } from "@apollo/client";

const CREATE_COMMENT = gql`
  mutation createComment($comment: String!, $blogId: ID!, $userId: ID!) {
    createComment(comment: $comment, blogId: $blogId, userId: $userId) {
      id
      comment
      blogId
      userId
      createdAt
      user {
        name
        avatar
        id
      }
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: ID!, $userId: ID!) {
    deleteComment(commentId: $commentId, userId: $userId) {
      comment
      id
    }
  }
`;

export { CREATE_COMMENT, DELETE_COMMENT };
