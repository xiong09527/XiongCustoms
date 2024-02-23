export const typeDefs = `
  # GraphQL schema definition

  type Comment {
    id: ID!
    comment: String
    blogId: String
    userId: String
    user: User
    createdAt: String
  }

  type Email {
  from: String!
  to: String!
  subject: String!
  html: String!
}
  
  type Blog {
    id: ID!
    title: String!
    thumbnail: String!
    description: String!
    user: User!
    comments: [Comment!]
    createdAt: String!
    userId:String!
  }

  type User {
    id: ID!
    avatar: String
    name: String
    email: String
    admin: Boolean
    password: String
    token: String
    resetToken: String
    resetTokenExpires: String
  }

  type Message {
    name: String!
    subject: String!
    email: String!
    text: String!
    seen: Boolean
    id: ID!
    userId: String!
    createdAt: String
  }

    type Query {
    blogs: [Blog]
    blog(blogId:ID!): Blog
    }

   type Mutation {
    createBlog(userId:ID! thumbnail:String! title:String! description:String!): Blog
  

    createComment( comment:String! userId:ID! blogId: ID! ):Comment
    deleteComment( userId:ID! commentId: ID! ):Comment
    seenMessage(messageId:ID! adminId:ID!): Message
    sendMessage( name:String! email:String! subject:String! text:String! userId:String! ): Message
    deleteMessage(messageId:ID! adminId:ID!): Message
   
  }
`;
