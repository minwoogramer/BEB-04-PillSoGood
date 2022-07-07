import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"

const Nft = require("../../models/nft")

type nft = {
    _id: string
    nftHash: string
    imagePath: string
}

export default {
    Query: {
        async getNfts(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("getNfts", userInfo._id)
            
            const nfts = Nft.find({
                userId:userInfo._id
            })
            return nfts
        }
    },
    Mutation: {
        async createNft(_:any, args:{jwt:string, nftHash:string, imagePath:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("createNft", userInfo._id)

            const newNft = new Nft()
            newNft.nftHash = args.nftHash
            newNft.imagePath = args.imagePath
            newNft.userId = userInfo._id

            const res = await newNft.save()
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
    }
}