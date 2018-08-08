import r2 from 'r2'

const url = 'https://api.themoviedb.org/3'

export const getPoster = async id => {
  try {
    const response = await r2.get(
      `${url}/find/${id}?api_key=${process.env.VUE_APP_KEY}&language=en-US&external_source=imdb_id`
    ).json
    return response.tv_results[0].poster_path
  } catch (e) {
    console.log(`getPoster for TMDB/${id} failed:`, e)
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

/*
export async function getBackdrop (id) {
  try {
    const response = await axios.get(
      `${url}/find/${id}?api_key=${process.env.TMDB_KEY}&language=en-US&external_source=imdb_id`)
    return response.data.tv_results[0].backdrop_path
  } catch (err) {
    console.log(`Request for /shows/${id} failed:`, err)
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }
}
*/
