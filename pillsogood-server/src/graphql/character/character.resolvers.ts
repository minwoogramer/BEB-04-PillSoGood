import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"

const Character = require("../../models/character")
const moment = require("moment")

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
            
            createLog("getCharacters", userInfo._id)

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

            createLog("createCharacter", userInfo._id)

            const newCharacter = new Character()
            newCharacter.name = args.name
            newCharacter.level = 0
            newCharacter.userId = userInfo._id
            newCharacter.createdAt = moment().format("YYYY-MM-DD HH:mm:ss")

            const res = await newCharacter.save()
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async updateCharacter(_:any, args:{jwt:string, _id:string, name:string, level:number}){
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("updateCharacter", userInfo._id)

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

            createLog("deleteCharacter", userInfo._id)
            
            const res = await Character.deleteOne(
                {_id:args._id, userId:userInfo._id}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        }
    }
}