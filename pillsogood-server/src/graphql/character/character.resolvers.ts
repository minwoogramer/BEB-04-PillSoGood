import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"

const Character = require("../../models/character")

type character = {
    _id: string
    userId:string
    name:string
    level:number
}

export default {
    Query: {
        async getCharacters(_:any, args:{jwt:string}){
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const characters = Character.find({
                userId:userInfo._id
            })
            return characters
        }
    },
    Mutation: {
        async createCharacter(_:any, args:{jwt:string, name:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const newCharacter = new Character()
            newCharacter.name = args.name
            newCharacter.level = 0
            newCharacter.userId = userInfo._id

            const res = await newCharacter.save()
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async updateCharacter(_:any, args:{jwt:string, _id:string, name:string, level:number}){
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const res = await Character.updateOne(
                {_id:args._id, userId:userInfo._id},
                {name:args.name, level:args.level}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async deleteCharacter(_:any, args:{jwt:string, _id:string}){
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const res = await Character.deleteOne(
                {_id:args._id, userId:userInfo._id}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        }
    }
}