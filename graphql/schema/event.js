
const eventSchema = `
  type Event {
    id: ID!
    name: String!
    description: String
    type: String
    start_date: String
    end_date: String
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input EventInput {
    name: String
    description: String
    type: String
    start_date: String
    end_date: String
    create_time: String!
    update_time: String
    created_by: String
    updated_by: String
  }

  type Query {
    getAllEvents: [Event]
    getEvent(id: ID!): Event
    getEventByQuery(query: String!): [Event]
  }

  type RootMutation {
    createEvent(eventInput: EventInput!): Event
    updateEvent(id: ID!, eventInput: EventInput!): Event
    deleteEvent(id: ID!): Event
  }

`;

module.exports = eventSchema;