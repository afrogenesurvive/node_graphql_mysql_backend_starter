
const reviewSchema = `
  type Review {
    id: ID!
    user_id: ID!
    user: User
    show_id: ID!
    show: Show
    venue_id: ID
    venue: Venue
    event_id: ID
    event: Event
    type: String
    review: String!
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input ReviewInput {
    user_id: ID
    show_id: ID
    venue_id: ID
    event_id: ID
    type: String
    review: String
    create_time: String!
    update_time: String
    created_by: String
    updated_by: String
  }

  type Query {
  getAllReviews: [Review]
  getReview(id: ID!): Review
  getReviewByQuery(query: String!): [Review]
}

type RootMutation {
  createReview(reviewInput: ReviewInput!): Review
  updateReview(id: ID!, reviewInput: ReviewInput!): Review
  deleteReview(id: ID!): Review
}

`;

module.exports = reviewSchema;