import r2 from 'r2'

const url = 'https://api.trakt.tv'

const createHeaders = (oauth = false, token = false) => {
  const headers = {
    'Content-Type': 'application/json',
    'trakt-api-key': process.env.VUE_APP_CLIENT_ID,
    'trakt-api-version': '2'
  }
  if (oauth) headers['Authorization'] = `Bearer ${token}`
  return headers
}

export const getShow = async slug => {
  try {
    const headers = createHeaders()
    const response = await r2.get(`${url}/shows/${slug}?extended=full`,
      { headers })
    return response.json
  } catch (e) {
    console.error(`Request for Trakt /shows/${slug} failed:`, e)
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

export const getNextEpisode = async slug => {
  try {
    const headers = createHeaders()
    const response = await r2.get(
      `${url}/shows/${slug}/next_episode?extended=full`, { headers })
    const resp = await response.response
    if (resp.status === 204) {
      return new Promise((resolve, reject) => {
        reject(new Error('No Future Episodes Announced'))
      })
    }
    const json = await response.json
    return json.first_aired
  } catch (e) {
    console.error(`Request for Trakt /shows/${slug}/next_episode failed:`, e)
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

export const getNextEpisodeInfo = async slug => {
  try {
    const headers = createHeaders()
    return await r2.get(`${url}/shows/${slug}/next_episode?extended=full`,
      { headers }).json
  } catch (e) {
    console.error(`Request for Trakt /shows/${slug}/next_episode failed:`, e)
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

export const getLists = async token => {
  try {
    const headers = createHeaders(true, token)
    return r2.get(`${url}/users/me/lists`, { headers }).json
  } catch (e) {
    console.error('Request for /users/me/lists failed:', e)
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

export const checkForWhenList = lists => {
  const ids = lists.map(list => {
    return list.ids.slug
  })
  return ids.includes('when')
}

export const getWhenListItems = async token => {
  try {
    const headers = createHeaders(true, token)
    return r2.get(`${url}/users/me/lists/when/items/shows`, { headers }).json
  } catch (e) {
    console.error('Request for Trakt /users/me/lists/when/items/shows failed:',
      e)
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

export const getDefaultListItems = async () => {
  try {
    const headers = createHeaders()
    return r2.get(`${url}/users/redxtech/lists/default-when-list/items/shows`,
      { headers }).json
  } catch (e) {
    console.error(
      'Request for Trakt /users/redxtech/lists/default-when-list/items/shows failed:',
      e)
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

export const createWhenList = async token => {
  try {
    const headers = createHeaders(true, token)
    const json = {
      name: 'when2.',
      description: 'List of shows to track on when. by @RedXTech.',
      privacy: 'friends'
    }
    return r2.post(`${url}/users/me/lists`, { json, headers }).json
  } catch (e) {
    console.error('Request to Trakt /users/me/lists (create when list) failed:',
      e)
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

export const addShowToWhenList = async (token, slug) => {
  try {
    const headers = createHeaders(true, token)
    const json = { shows: [{ ids: { slug } }] }
    const req = await r2.post(
      `${url}/users/me/lists/when/items`, { json, headers })
    return await req.json
  } catch (e) {
    console.error('Request to Trakt /users/me/lists/when/items failed:', e)
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

export const removeShowFromWhenList = async (token, slug) => {
  try {
    const headers = createHeaders(true, token)
    const json = { shows: [{ ids: { slug } }] }
    const req = await r2.post(
      `${url}/users/me/lists/when/items/remove`, { json, headers })
    return await req.json
  } catch (e) {
    console.error('Request to Trakt /users/me/lists/when/items/remove failed:',
      e)
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

export const getOAuthURL = () => `https://trakt.tv/oauth/authorize?response_type=code&client_id=${
  process.env.VUE_APP_CLIENT_ID}&redirect_uri=${origin}`

export const getOAuthToken = async code => {
  try {
    const json = { code, clientID: process.env.VUE_APP_CLIENT_ID }
    const response = await r2.post(`${process.env.VUE_APP_API}/exchange`,
      { json })
    const resp = await response.json
    return await resp.access_token
  } catch (e) {
    console.error('Request to exchange code for oauth token failed:', e)
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

export const checkOAuthToken = async token => {
  try {
    const headers = createHeaders(true, token)
    const response = await r2.get(`${url}/users/settings`, { headers })
    return !!response.json
  } catch (e) {
    console.error('Request to validate oauth token failed:', e)
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

export const revokeOAuthToken = async token => {
  try {
    const payload = { json: { token, clientID: process.env.VUE_APP_CLIENT_ID } }
    return await r2.post(`${process.env.VUE_APP_API}/revoke`, payload).json
  } catch (err) {
    console.error('Request to revoke oauth token failed:', err)
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }
}
