const router = require('koa-router')()

// router.get('/', async (ctx, next) => {
//   console.log("初始");
//   await ctx.render('index1', {
//     title: 'Hello Koa 2!'
//   })
// })

router.get('/jq', async (ctx, next) => {
  console.log("我的天吗");
  ctx.body='ok'
  
})


router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/api/*', async (ctx, next) => {
  ctx.body = {
    title: 'cs api'
  }
})

router.get('/test/mytest.json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json122'
  }
})

module.exports = router
