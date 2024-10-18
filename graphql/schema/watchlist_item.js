const watchlistItemSchema = `
  type WatchlistItem {
    id: ID!
    watchlist_id: ID!
    show_id: ID!
    position: Int!
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input WatchlistItemInput {
    watchlist_id: ID!
    show_id: ID!
    position: Int!
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  type Query {
    getAllWatchlistItems: [WatchlistItem]
    getWatchlistItem(id: ID!): WatchlistItem
    getWatchlistItemByQuery(query: String!): [WatchlistItem]
  }

  type Mutation {
    createWatchlistItem(watchlistItemInput: WatchlistItemInput!): WatchlistItem
    updateWatchlistItem(id: ID!, watchlistItemInput: WatchlistItemInput!): WatchlistItem
    deleteWatchlistItem(id: ID!): WatchlistItem
  }
`;

module.exports = watchlistItemSchema;