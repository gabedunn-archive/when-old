const exchangeToken = async (ctx) => {
  ctx.status = 200
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = {
    endpoint: 'exchange',
    token: 'token',
    status: 'success'
  }
  ctx.res.end()
}

const revokeToken = async (ctx) => {
  ctx.status = 200
  ctx.body = {
    endpoint: 'revoke',
    status: 'success'
  }
}

module.exports = {
  exchangeToken,
  revokeToken
}
