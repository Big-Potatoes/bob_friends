/* eslint-disable */
import axios from 'axios'

// axios base url, timeout custom
export const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 10000,
})
const access = localStorage.getItem('Bob_accessToken')
const refresh = localStorage.getItem('Bob_refreshToken')
const refreshToken = async () => {
  try {
    const {
      data: { accessToken, refreshToken },
    } = await api.post('/auth/token-refresh', {
      accessToken: access,
      refreshToken: refresh,
    })
    console.log(data)
    localStorage.setItem('Bob_accessToken', accessToken)
  } catch (error) {
    return console.log('재발급 실패', error)
  }
  // api
  //   .post('/auth/token-refresh', {
  //     accessToken: access,
  //     refreshToken: refresh,
  //   })
  //   .then((res) => {
  //     console.log('재발급 성공', res)
  //     const { account, accessToken } = res.data
  //     localStorage.setItem('Bob_accessToken', accessToken)
  //   })
  //   .catch((error) => {
  //     return console.log('재발급 실패', error)
  //   })
}

//* instance - request interceptor
api.interceptors.request.use(
  function (config) {
    // 토큰이 있으면 토큰을 설정하고, 없으면 요청함?
    config.headers.Authorization = `Bearer ${access}`
    return config
  },
  function (error) {
    // 요청에 에러가 있을 때 해야할 것
    console.log('token 설정 에러', error)
    return Promise.reject(error)
  }
)

//* instance - response interceptor
api.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    console.log(error)
    const originalReq = error.config
    // 토큰 에러 일때 리프레시 토큰으로 access 다시 발급받고
    // 이전에 실패한 요청 config 저장해서 재요청 보내기
    if (error.response.status && error.response.status === 401) {
      try {
        await refreshToken()
        const res = await api(originalReq)
        return console.logt('재요청 성공', res)
      } catch (error) {
        return console.log('재요청 실패', error)
      }
    }
    return Promise.reject(error)
  }
)
