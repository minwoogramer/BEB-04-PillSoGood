import { gql } from 'apollo-server-express';

export default gql`
    type Character {
        _id:String,
        userId:String,
        name:String,
        level:Int
    }

    type Query {
        getCharacters(jwt:String!):[Character]
    }

    type Mutation {
        createCharacter(jwt:String!, name:String!):Int!
        updateCharacter(jwt:String!, _id:String!, name:String!, level:Int!):Int!
        deleteCharacter(jwt:String!, _id:String!):Int!
    }
`