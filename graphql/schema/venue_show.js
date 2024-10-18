
const venueShowSchema = `
  type VenueShow {
    id: ID!
    show_id: ID!
    show: Show
    venue_id: ID!
    venue: Venue
    type: String
    date: String!
    start_time: String!
    end_time: String
    active: Boolean
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input VenueShowInput {
    show_id: ID
    venue_id: ID
    type: String
    date: String
    start_time: String
    end_time: String
    active: Boolean
    create_time: String!
    update_time: String
    created_by: String
    updated_by: String
  }

  type Query {
    getAllVenueShows: [VenueShow]
    getVenueShow(id: ID!): VenueShow
    getVenueShowByQuery(query: String!): [VenueShow]
  }

  type RootMutation {
    createVenueShow(venueShowInput: VenueShowInput!): VenueShow
    updateVenueShow(id: ID!, venueShowInput: VenueShowInput!): VenueShow
    deleteVenueShow(id: ID!): VenueShow
  }

`;

module.exports = venueShowSchema;