import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"

const User = require("../../models/user")
const moment = require("moment")
type user = {
    _id: number
    email: string
    password: string
    nickname: string
    dateOfBirth: string
    pointBalance: number
    createdAt: string
    PhoneNumber: String
}

type token = {
    jwt:string
}
 
export default {
    Query: {
        hi():string {
            return "hello 👋"
        },
        async getUserInfo(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("getUserInfo", userInfo._id)

            const user = User.findOne({
                _id:userInfo._id
            })
            return user
        }
    },
    Mutation: {
        async join(_:any, args: {nickname:string, email:string, dateOfBirth:string, password:string,  PhoneNumber:String}) {
            const crypto = require('crypto');
            const encryptedPassword = crypto.createHmac('sha256', process.env.PASSWORD_SECRET).update(args.password).digest('hex');
            const savedUser = await User.findOne({
                email:args.email
            });
            if(savedUser) return status.ALREADY_EXISTS_DATA

            const newUser = new User()
            newUser.nickname = args.nickname
            newUser.email = args.email
            newUser.dateOfBirth = args.dateOfBirth
            newUser.password = encryptedPassword
            newUser.pointBalance = 0
            newUser.createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
            newUser.PhoneNumber = args.PhoneNumber
            const res = await newUser.save() // 저장 
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS

        }, 
        async login(_:any, args: {email:string, password:string}) {
            const crypto = require('crypto');
            const encryptedPassword = crypto.createHmac('sha256', process.env.PASSWORD_SECRET).update(args.password).digest('hex');
            
            const loginUser = await User.findOne({
                email:args.email, password:encryptedPassword
            });
            if(!loginUser) return status.WRONG_USER_INFO

            createLog("login", loginUser._id)

            const jwt = require('jsonwebtoken')
            const accessToken = jwt.sign(
              {
                _id: loginUser._id,
                email: loginUser.email,
                nickname: loginUser.nickname
              },
              process.env.ACCESS_SECRET,
              {expiresIn:'365d'}
            )

            return {"jwt": accessToken}

        }
    }
}

