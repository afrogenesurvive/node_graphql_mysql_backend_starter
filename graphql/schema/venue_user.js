
const VenueUserSchema = `
  type VenueUser {
    id: ID!
    user_id: ID!
    user: User
    venue_id: ID!
    venue: Venue
    role: String
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input VenueUserInput {
    user_id: ID
    venue_id: ID
    role: String
    create_time: String!
    update_time: String
    created_by: String
    updated_by: String
  }

  type Query {
    getAllVenueUsers: [VenueUser]
    getVenueUser(id: ID!): VenueUser
    getVenueUserByQuery(query: String!): [VenueUser]
  }

  type RootMutation {
    createVenueUser(venueUserInput: VenueUserInput!): VenueUser
    updateVenueUser(id: ID!, venueUserInput: VenueUserInput!): VenueUser
    deleteVenueUser(id: ID!): VenueUser
  }

`;

module.exports = VenueUserSchema;