const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    """
    Planets and systems from the Star Wars galaxy.
    """
    enum Planet {
        KORRIBAN
        CORUSCANT
        NABOO
        ILUM
        TATOOINE
        HOTH
    }

    union Lifeform = Human | Alien

    interface Being {
        name: String!
        origin: Planet!
        occupation: String!
    }

    type Human implements Being {
        name: String!
        origin: Planet!
        occupation: String!
        languages: [String]
        military: Boolean
    }

    type Alien implements Being {
        name: String!
        origin: Planet!
        occupation: String!
        outerRim: Boolean!
    }

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
        master: String
        origin: Planet!
    }

    input NewJediInput {
        name: String!
        affiliation: String!
        lightsabers: [String]!
    }

    input NewSithInput {
        name: String!
        affiliation: String!
        origin: Planet!
    }

    input NewBeingInput {
        name: String!
        origin: Planet!
        occupation: String!
    }

    type Query {
        obiWan: Jedi!
        ani: Jedi!
        ahsoka: Jedi!
        sidious: Sith!
        beings: [Being]!
    }
    
    type Mutation {
        newJedi(input: NewJediInput!): Jedi!
        newSith(input: NewSithInput!): Sith!
        newBeing(input: NewBeingInput!): Being!
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
                    'Concealment', 'Force Dash'
                ],
                master: 'Darth Plagueis',
                origin: 'NABOO'
            }
        },
        beings(_, {input}){
            return [
                {name: 'Sheev Palpatine', origin: 'NABOO', occupation: 'Senator', military: false},
                {name: 'Greedo', origin: 'TATOOINE', occupation: 'Bounty Hunter', outerRim: true}
            ]
        }
    },
    Mutation: {
        newJedi(_, {input}) {
            return input
        },
        newSith(_, {input}) {
            return input
        },
        newBeing(_, {input}) {
            return input
        }
    },
    Being: {
        __resolveType(being) {
            if (being.outerRim) return 'Alien'
            return 'Human'
        }
    },
    Lifeform: {
        __resolveType(lifeform) {
            if(lifeform.outerRim) return 'Alien'
            return 'Human'
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(1989)
    .then(() => console.log('server listening on port 1989!'))