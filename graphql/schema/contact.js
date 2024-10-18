
const contactSchema = `
  type Contact {
    id: ID!
    entity_type: String!
    entity_id: ID!
    primary: Boolean
    phone: String
    phone2: String
    email: String
    address: String
    address2: String
    state: String
    city: String
    country: String
    postal_code: String
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }
  
  input ContactInput {
    entity_type: String
    entity_id: ID
    primary: Boolean
    phone: String
    phone2: String
    email: String
    address: String
    address2: String
    state: String
    city: String
    country: String
    postal_code: String
    create_time: String!
    update_time: String
    created_by: String
    updated_by: String
  }

  type Query {
    getAllContacts(args: String): [Contact]
    getContact(id: ID!): Contact
    getContactByQuery(query: String!): [Contact]
  }

  type RootMutation {
    createContact(userInput: ContactInput!): Contact
    updateContact(id: ID!, userInput: ContactInput!): Contact
    deleteContact(id: ID!): Contact
  }


`;
module.exports = contactSchema;