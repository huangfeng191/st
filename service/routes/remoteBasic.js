const router = require('koa-router')()
const saveBasic = require('../customs/remote/saveBasic')

//post 请求
router.post('/upload/basic',async  (ctx, next)=> {
    let body = ctx.request.body;
    console.log("11")
    ctx.body  = await saveBasic.body(body);
});

//post 请求
router.post('/get/basic',async  (ctx, next)=> {
  let body = ctx.request.body;
  ctx.body  = await saveBasic.getBasic(body);
});


module.exports = router