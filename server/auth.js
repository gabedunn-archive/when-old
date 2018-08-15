const {config} = require('dotenv')
const {resolve} = require('path')
const r2 = require('r2')

config({path: resolve(process.cwd(), '.env.local')})

const exchangeToken = async (ctx) => {
  if (ctx.request.method === 'POST') {
    const rawBody = ctx.request.rawBody
    let body
    if (rawBody) {
      body = JSON.parse(rawBody)
    } else {
      throw new Error('no body')
    }
    const headers = {
      'Content-Type': 'application/json'
    }
    const reqBody = {
      'code': body.code,
      'client_id': body.clientID,
      'client_secret': process.env.CLIENT_SECRET,
      'redirect_uri': process.env.VUE_APP_ORIGIN,
      'grant_type': 'authorization_code'
    }
    try {
      const request = await r2.post('https://api.trakt.tv/oauth/token',
        {headers, json: reqBody})
      ctx.body = await request.json
      ctx.status = 200
    } catch (e) {
      console.log('Error:', e)
      ctx.status = 401
      ctx.body = {
        endpoint: 'exchange',
        token: undefined,
        status: 'failure'
      }
    }
  } else {
    ctx.status = 200
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept')
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  }
}

const revokeToken = async (ctx) => {
  if (ctx.request.method === 'POST') {
    const rawBody = ctx.request.rawBody
    let body
    if (rawBody) {
      body = JSON.parse(rawBody)
    } else {
      throw new Error('no body')
    }
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${body.token}`,
      'trakt-api-version': '2',
      'trakt-api-key': body.clientId
    }
    const requestBody = `token=${body.token}`
    try {
      const request = await r2.post('https://api.trakt.tv/oauth/revoke',
        {headers, body: requestBody})
      ctx.body = await request.json
      ctx.status = 200
    } catch (e) {
      console.log('Error:', e)
      ctx.status = 401
      ctx.body = {
        endpoint: 'revoke',
        status: 'failure'
      }
    }
  } else {
    ctx.status = 200
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept')
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  }

}

module.exports = {
  exchangeToken,
  revokeToken
}
