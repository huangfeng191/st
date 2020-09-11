const router = require('koa-router')()

const mystock = require('../customs/mystock/ui.js')
//get 请求
router.get('/api/*', async (ctx, next) => {
    ctx.body = {
        title: 'cs api'
    }
})

//post 请求
router.post('/api/:md/:mp',async  (ctx, next)=> {
    let md = ctx.params.md;
    let mp = ctx.params.mp;
    let body = ctx.request.body;

    // let id =ctx.request.body.id || 0;
    //ctx.body = "you post data:"+JSON.stringify({id:id});
    let obj = {md, body,mp}
      ctx.body  = await mystock.body(obj);


});


module.exports = router