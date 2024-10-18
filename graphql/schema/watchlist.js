const watchlistSchema = `
  type Watchlist {
    id: ID!
    user_id: ID!
    name: String!
    description: String
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input WatchlistInput {
    user_id: ID!
    name: String!
    description: String
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  type Query {
    getAllWatchlists: [Watchlist]
    getWatchlist(id: ID!): Watchlist
    getWatchlistByQuery(query: String!): [Watchlist]
  }

  type Mutation {
    createWatchlist(watchlistInput: WatchlistInput!): Watchlist
    updateWatchlist(id: ID!, watchlistInput: WatchlistInput!): Watchlist
    deleteWatchlist(id: ID!): Watchlist
  }
`;

module.exports = watchlistSchema;