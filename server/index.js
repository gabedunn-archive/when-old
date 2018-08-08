const Koa = require('koa')
const Router = require('koa-router')
const koaJson = require('koa-json')
const koaStatic = require('koa-static')
const path = require('path')

const app = new Koa()
const r = new Router()

app.use(koaJson())
app.use(koaStatic(path.join(__dirname, '..', 'dist')))

r.get('/', home)

app.use(r.routes())

async function home (ctx) {
  ctx.body = 'henlo fren'
}

app.listen(8080)
console.log('Listening on port 8080...')
