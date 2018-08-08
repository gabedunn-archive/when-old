const exchangeToken = async (ctx) => {
  ctx.status = 200
  ctx.body = 'exchanged'
}

const revokeToken = async (ctx) => {
  ctx.status = 200
  ctx.body = 'revoked'
}

module.exports = {
  exchangeToken,
  revokeToken
}
