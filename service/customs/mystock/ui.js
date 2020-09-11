var mongoose = require("../../databases/mongo.js")
var assert = require('assert');
//model不能重复被定义
var StockPage = mongoose.model("Stock_page", {
    "_id": {type: String},
    "now": {type: Object},// 记录最新值
    "k": {type: String}, //应用主键
    "v": {type: Array}, //应用连接
    "aae013": {type: String},//备注
    "addr": {type: String},//链接地址
    "app":{type:String},
    "changed": {type: Number}
});

//对象解构
async function body({md, body, mp}) {
    if (md == "mystock" && mp == "update.json") {
        var stockpage = {};
        // body  list 数组
        for (var r of body) {
            if (r._id) {
                stockpage={k: r.k, v: r.v}
                stockpage["aae013"]=r.aae013;
                stockpage["app"]=r.app;
                stockpage["addr"]=r.addr;
                await StockPage.update({"_id": r._id}, stockpage);
            } else {
                stockpage = new StockPage({"_id": mongoose.Types.ObjectId(), k: r.k, v: r.v,aae013:r.aae013,app:r.app,addr:r.addr  });


                await stockpage.save();
            }
        }
        return new Promise(function (resolve, reject) {
            resolve(StockPage.find({}));
        });


    } else if (md == "mystock" && mp == "query.json") {
        var o = {}
        o["l"] = await StockPage.find({})
        o["now"] = await StockPage.find({}).sort({'now.changed': -1}).limit(1)
        if(o["now"].length>0){
            o["now"]=o["now"][0]
        }else{
            o["now"]=null
        }
        return new Promise(function (resolve, reject) {
            resolve(o);
        });
    } else if (md == "mystock" && mp == "history.json") {
        // body  history 数组
// "addr": body.addr, "app": body.app,
        await StockPage.update({"k": body.type}, {"now": { "changed": Date.parse(new Date()) / 1000}});

        return new Promise(function (resolve, reject) {
            resolve("ok");
        });
    }

    else {
        return 456;
    }


}

module.exports = {
    "body": body
}