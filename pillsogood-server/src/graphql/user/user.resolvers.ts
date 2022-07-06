
 const User = require("../../models/user")  // mongo db 스키마 임포트

 export default {
     Query: {
         hi():string {
             return "hello 👋"
         }
     },
 }