import { gql } from 'apollo-server-express';

export default gql`
    type Nft {
        _id:String,
        nftHash:String,
        imagePath:String
    }

    type Query {
        getNfts(jwt:String!):[Nft]
    }

    type Mutation {
        createNft(jwt:String!, nftHash:String!, imagePath:String!):Int!
        updateNft(jwt:String!, _id:String!, nftHash:String!, imagePath:String!):Int!
        deleteNft(jwt:String!, _id:String!):Int!
    }
`