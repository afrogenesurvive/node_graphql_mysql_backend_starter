
const venueEventSchema = `
  type VenueEvent {
    id: ID!
    venue_id: ID!
    venue: Venue
    event_id: ID!
    event: Event
    show_id: ID
    show: Show
    active: Boolean
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input VenueEventInput {
    venue_id: ID
    event_id: ID
    show_id: ID
    active: Boolean
    create_time: String!
    update_time: String
    created_by: String
    updated_by: String
  }

  type Query {
    getAllVenueEvents: [VenueEvent]
    getVenueEvent(id: ID!): VenueEvent
    getVenueEventByQuery(query: String!): [VenueEvent]
  }

  type RootMutation {
    createVenueEvent(venueEventInput: VenueEventInput!): VenueEvent
    updateVenueEvent(id: ID!, venueEventInput: VenueEventInput!): VenueEvent
    deleteVenueEvent(id: ID!): VenueEvent
  }

`;

module.exports = venueEventSchema;