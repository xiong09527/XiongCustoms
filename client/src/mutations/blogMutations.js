import { gql } from "@apollo/client";

const CREATE_BLOG = gql`
  mutation createBlog(
    $userId: ID!
    $title: String!
    $thumbnail: String!
    $description: String!
  ) {
    createBlog(
      userId: $userId
      title: $title
      thumbnail: $thumbnail
      description: $description
    ) {
      id
      userId
      title
      description
    }
  }
`;

const DELETE_BLOG = gql`
  mutation deleteBlog($blogId: ID!, $adminId: ID!) {
    deleteBlog(blogId: $blogId, adminId: $adminId) {
      id
    }
  }
`;

export { CREATE_BLOG, DELETE_BLOG };
