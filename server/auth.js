const exchangeToken = async (ctx) => {
  ctx.status = 200
  ctx.body = {
    endpoint: 'exchange',
    token: 'token',
    status: 'success'
  }
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
