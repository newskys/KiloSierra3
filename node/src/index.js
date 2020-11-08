const path = require('path')
const Koa = require('koa')
const views = require('koa-views')
const serve = require('koa-static')
const PORT = 8080

const app = new Koa()

// app.use(serve(path.join(__dirname, '../../dist')))
app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }))
app.use(async (ctx) => {
  await ctx.render('index.ejs', {})
})

app.listen(PORT)
console.log('app listening on port:' + PORT)
