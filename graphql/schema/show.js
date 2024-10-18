
const showSchema = `
    type Show {
        id: ID!
        title: String!
        description: String
        production_company_id: ID
        production_company: ProductionCompany
        age_recommendation: String
        duration: String
        start_date: String
        end_date: String
        type: String
        create_time: String!
        update_time: String
        created_by: ID!
        updated_by: ID
        is_deleted: Boolean!
    }

    input ShowInput {
        title: String
        description: String
        production_company_id: ID
        age_recommendation: String
        duration: String
        start_date: String
        end_date: String
        type: String
        create_time: String!
        update_time: String
        created_by: String
        updated_by: String
    }

    type Query {
        getAllShows: [Show]
        getShow(id: ID!): Show
        getShowByQuery(query: String!): [Show]
    }

    type RootMutation {
        createShow(showInput: ShowInput!): Show
        updateShow(id: ID!, showInput: ShowInput!): Show
        deleteShow(id: ID!): Show
    }

`;

module.exports = showSchema;