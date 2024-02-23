import { gql } from "@apollo/client";

const GET_BLOGS = gql`
  query getBlogs {
    blogs {
      thumbnail
      title
      description
      id
      createdAt
      user {
        name
        avatar
        id
      }
    }
  }
`;

const GET_BLOG = gql`
  query getBlog($blogId: ID!) {
    blog(blogId: $blogId) {
      thumbnail
      title
      description
      createdAt
      user {
        name
        avatar
        id
      }
      comments {
        comment
        userId
        blogId
        id
        user {
          name
          avatar
          id
        }
      }
    }
  }
`;

export { GET_BLOGS, GET_BLOG };
