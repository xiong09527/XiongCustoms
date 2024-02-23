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

  type Payment {
    id: String
    paymentId: String
    userId: String
    amount: Int
    status: String
    email: String
    paid: Boolean
    amount_captured: Int
    city: String
    country: String
    line1: String
    postCode: String
    name: String
    receipt_url: String
    seen: Boolean
    createdAt: String
  }

  type forgetPasswordType{
    status:Boolean
    message: String
    token: String
  }

    type Query {
    blogs: [Blog]
    blog(blogId:ID!): Blog
    users(adminId:ID!): [User]
    user(adminId:ID!, userId:ID!): User
    messages(adminId:ID!): [Message]
    message(messageId:ID! adminId:ID!): Message
    payments(adminId:ID!): [Payment]
    payment(adminId:ID!, paymentId:ID!): Payment
    
  }
   type Mutation {
    createBlog(userId:ID! thumbnail:String! title:String! description:String!): Blog
    deleteBlog(adminId:ID! blogId:ID!): Blog
    deleteUser(adminId:ID! userId:ID!): User
    updateUser(adminId:ID! userId:ID!): User
    registerUser(avatar:String! name:String! email:String! password:String! ):User
    loginUser( email:String! password:String! ):User
    forgetPassword( email:String!  ):forgetPasswordType
    resetPassword( password:String! resetToken:String!  ):forgetPasswordType

    createComment( comment:String! userId:ID! blogId: ID! ):Comment
    deleteComment( userId:ID! commentId: ID! ):Comment
    seenMessage(messageId:ID! adminId:ID!): Message
    sendMessage( name:String! email:String! subject:String! text:String! userId:String! ): Message
    deleteMessage(messageId:ID! adminId:ID!): Message
    payment(tokenId:ID!, amount:Int!): Payment
  }
`;
