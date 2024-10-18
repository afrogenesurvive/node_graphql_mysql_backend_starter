
const ratingSchema = `
  type Rating {
    id: ID!
    user_id: ID!
    user: User
    show_id: ID!
    show: Show
    venue_id: ID
    venue: Venue
    event_id: ID
    event: Event
    review_id: ID
    review: Review
    type: String
    value: Int!
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input RatingInput {
    user_id: ID
    show_id: ID
    venue_id: ID
    event_id: ID
    review_id: ID
    type: String
    value: Int
    create_time: String!
    update_time: String
    created_by: String
    updated_by: String
  }

  type Query {
    getAllRatings: [Rating]
    getRating(id: ID!): Rating
    getRatingByQuery(query: String!): [Rating]
  }

  type RootMutation {
    createRating(ratingInput: RatingInput!): Rating
    updateRating(id: ID!, ratingInput: RatingInput!): Rating
    deleteRating(id: ID!): Rating
  }

`;

module.exports = ratingSchema;
