const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Jedi {
        name: String!
        affiliation: String!
        padawan: Jedi
        lightsaber: String!
        forms: [String]
        master: Jedi
    }

    type Query {
        obiWan: Jedi!
    }
`

const resolvers = {
    Query: {
        obiWan() {
            return {
                name: 'Obi-Wan Kenobi',
                affiliation: 'Master',
                padawan: {
                    name: 'Anakin  Skywalker',
                    affiliation: 'Knight',
                    lightsaber: 'blue'
                },
                lightsaber: 'blue',
                forms: ['Form IV', 'Soresu']
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(1989)
    .then(() => console.log('server listening on port 1989!'))