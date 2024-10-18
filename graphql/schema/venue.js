
const venueSchema = `
  type Venue {
    id: ID!
    name: String!
    description: String
    type: String
    accessibility: String
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input VenueInput {
    name: String
    description: String
    type: String
    accessibility: String
    create_time: String!
    update_time: String
    created_by: String
    updated_by: String
  }

  type Query {
    getAllVenues: [Venue]
    getVenue(id: ID!): Venue
    getVenueByQuery(query: String!): [Venue]
  }

  type RootMutation {
    createVenue(venueInput: VenueInput!): Venue
    updateVenue(id: ID!, venueInput: VenueInput!): Venue
    deleteVenue(id: ID!): Venue
  }

`;

module.exports = venueSchema;