var mongoose = require("../../databases/mongo.js")

//model不能重复被定义
var Remote_info = mongoose.model("Remote_info", {
   "_id": {type: String},
   "ip": {type: String},// 记录最新值
   "changed": {type: Number}
});


async function body(body) {
   console.log(body);
   const remote_info= new Remote_info({_id:mongoose.Types.ObjectId(), ip:body.ip   ,"changed": Date.parse(new Date()) / 1000});
   await remote_info.save( );
   return new Promise(function (resolve, reject) {
      resolve("ok");
  });
}


async function getBasic(body) {
   console.log(body);
  
   return  await Remote_info.find().limit(10).sort({"changed":1}).exec();
}

module.exports = {
   "body": body,
   "getBasic":getBasic
}