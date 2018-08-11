const cors = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept')
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  await next()
}

const responseTime = async (ctx, next) => {
  const t1 = Date.now()
  await next()
  const t2 = Date.now()
  ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms')
}

const home = async (ctx, next) => {
  ctx.status = 200
  ctx.body = 'henlo fren'
}

module.exports = {
  cors,
  responseTime,
  home
}