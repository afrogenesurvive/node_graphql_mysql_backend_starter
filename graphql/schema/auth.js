
const authSchema = `
  

  type RegisterData {
    username: String!
    password: String!
    email: String!
    first_name: String
    last_name: String
    age: Int
    gender: String
    response: String
  }

  type VerifyData {
    user_id: ID!
    type: String!
    response: String
  }

  type PasswordResetData {
    email: String!
    code: String!
    newPassword: String
    response: String
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input VerifyInput {
    username: String!
    email: String!
    code: String!
    type: String!
  }

  input PasswordResetInput {
    email: String!
    code: String
    newPassword: String
  }

  type AuthData {
    activityId: ID!
    token: String
    tokenExpiration: Int!
    error: String
  }
  
  input RegisterInput {
    username: String!
    first_name: String!
    last_name: String!
    dob: String!
    age: Int!
    password: String!
  }


  type Query {
    login(loginInput: LoginInput!): AuthData!
    verify(verifyInput: VerifyInput!): VerifyData!
    requestPasswordReset(passwordResetInput: PasswordResetInput!): String!
    logout(id: ID!): String!
    testQuery(args: String): String!
  }

  type Mutation {
    passwordReset(passwordResetInput: PasswordResetInput!): PasswordResetData!
    register(registerInput: RegisterInput!): String!
  }

  
`;

module.exports = authSchema;
