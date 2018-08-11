const Koa = require('koa')
const Router = require('koa-router')
const koaJson = require('koa-json')
const koaStatic = require('koa-static')
const path = require('path')

const {exchangeToken, revokeToken} = require('./auth')

const app = new Koa()
const r = new Router()

app.use(koaJson())
app.use(koaStatic(path.join(__dirname, '..', 'dist')))
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  await next();
});

r.get('/', home)
r.post('/exchange', exchangeToken)
r.post('/revoke', revokeToken)

app.use(r.routes())

async function home (ctx) {
  ctx.body = 'henlo fren'
}

const port = process.env.PORT || 8080

app.listen(port)
console.log(`Listening on port ${port}...`)
