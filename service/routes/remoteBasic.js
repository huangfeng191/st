const router = require('koa-router')()
const saveBasic = require('../customs/remote/saveBasic')

//post 请求
router.post('/upload/basic',async  (ctx, next)=> {
    let body = ctx.request.body;
    console.log("11")
    // let id =ctx.request.body.id || 0;
    //ctx.body = "you post data:"+JSON.stringify({id:id});
    
      ctx.body  = await saveBasic.body(body);


});


module.exports = router