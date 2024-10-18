
const userSchema = `
  type User {
    id: ID!
    username: String!
    first_name: String!
    last_name: String!
    middle_name: String
    full_name: String
    type: String
    subtype: String
    dob: String!
    age: Int!
    gender: String
    contact: Contact
    password: String!
    system_id: String!
    notes: String
    role: String
    logged_in: Boolean
    activity: [Activity]
    verified: Boolean
    verification_code: String
    verification_type: String
    reset_code: String
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input UserInput {
    username: String
    first_name: String
    last_name: String
    middle_name: String
    full_name: String
    type: String
    subtype: String
    dob: String
    age: Int
    gender: String
    password: String
    system_id: String
    notes: String
    role: String
    create_time: String!
    update_time: String
    created_by: String
    updated_by: String
    verified: Boolean
  }
  
  type Permission {
    user_id: ID!
    name: String!
    entity_id: ID
    create_time: String!
    update_time: String
    created_by: String!
    updated_by: String
  }


  type Activity {
    date: String
    request: String
  }


  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    getUserByQuery(query: String!): [User]
  }

  type RootMutation {
    createUser(userInput: UserInput!): User
    updateUser(id: ID!, userInput: UserInput!): User
    deleteUser(id: ID!): User
  }

  
`;

module.exports = userSchema;
