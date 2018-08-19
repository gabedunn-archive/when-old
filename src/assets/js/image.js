import r2 from 'r2'

export const getImageAsBase64 = async url => {
  try {
    const request = await r2.get(url)
    const response = await request.response
    const buffer = await response.arrayBuffer()
    return `data:image/jpeg;base64, ${arrayBufferToBase64(buffer)}`
  } catch (e) {
    console.error('Failed:', e)
  }
}

export const arrayBufferToBase64 = buffer => {
  const bytes = [].slice.call(new Uint8Array(buffer))
  let binary = ''
  bytes.forEach(b => {
    binary += String.fromCharCode(b)
  })
  return window.btoa(binary)
}
