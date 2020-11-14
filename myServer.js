const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Jedi {
        name: String!
        affiliation: String!
        padawan: Jedi
        lightsabers: [String]!
        forms: [String]
        master: Jedi
        nickname: String
    }

    type Sith {
        name: String!
        title: String!
        affiliation: String!
        abilities: [String]!
        master: Sith
        origin: String!
    }

    input NewJediInput {
        name: String!
        affiliation: String!
        lightsabers: [String]!
    }

    input NewSithInput {
        name: String!
        affiliation: String!
        origin: String!
    }

    type Query {
        obiWan: Jedi!
        ani: Jedi!
        ahsoka: Jedi!
        sidious: Sith!
    }
    
    type Mutation {
        newJedi(input: NewJediInput!): Jedi!
    }

    type Mutation {
        newSith(input: NewSithInput!): Sith!
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
                    lightsabers: ['blue']
                },
                lightsabers: ['blue'],
                forms: ['Form IV', 'Soresu'],
                master: {
                    name: 'Qui-Gon Jinn'
                },
                nickname: 'Ben'
            }
        },
        ani() {
            return {
                name: 'Anakin Skywalker',
                affiliation: 'Not granted the rank of Master',
                padawan: {
                    name: 'Ahsoka Tano',
                    affiliation: 'Padawan',
                    lightsabers: ['Yellow', 'Green'],
                    forms: ['Form V - Shien'],
                    master: {
                        name: 'Anakin Skywalker'
                    }
                },
                lightsabers: ['blue'],
                form: ['Form V - Djem So'],
                master: {
                    name: 'Obi-Wan Kenobi',
                    nickname: 'Ben'
                },
                nickname: 'Ani'
            }
        },
        ahsoka() {
            return {
                name: 'Ahsoka Tano',
                affiliation: 'Padawan',
                lightsabers: ['Yellow', 'Green'],
                forms: ['Form V - Shien'],
                master: {
                    name: 'Anakin Skywalker',
                    nickname: 'Skyguy'
                },
                nickname: 'Snips'
            }
        },
        sidious() {
            return {
                name: 'Sheev Palpatine',
                title: 'Darth Sidious',
                affiliation: 'Master',
                abilities: [
                    'Force Lightning', 'Force Spin', 'Telekinesis', 'Force Choke',
                    'Dark Aura', 'Foresight', 'Sith Magic', 'Force Persuasion',
                    'Concealing himself in the Force', 'Force Dash'
                ],
                master: {
                    name: 'Darth Plagueis'
                },
                origin: 'Naboo'
            }
        }
    },
    Mutation: {
        newJedi(_, {input}) {
            return input
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(1989)
    .then(() => console.log('server listening on port 1989!'))