
 const User = require("../../models/user")  // mongo db 스키마 임포트

 export default {
     Query: {
         hi():string {
             return "hello 👋"
         }
     },
 
     /* Mutation : {
         async createUser (_: any, args: { name: string })  {
             const createdUser = new User({   // mongo db 스키마를 기반으로 새로운 유저 생성
                 name : name
             })
             const res = await createdUser.save() // 저장 
             console.log(res._doc);
             return {
                 id : res.id,
                 ...res._doc
             }
         }
     } */
 }