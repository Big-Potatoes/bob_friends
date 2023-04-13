/* eslint-disable */
import axios from 'axios'

// axios base url, timeout custom
export const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 10000,
})
// const access = localStorage.getItem('Bob_accessToken')
const access =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QWNjIiwibmFtZSI6InRlc3QiLCJpYXQiOjE2ODEyODYyMzYsImV4cCI6MTY4MTI4ODAzNn0.OtOjRi8-6rdynXojy5lbzCJfX_SPd_MPjuBLjRmvlIE'
const refresh = localStorage.getItem('Bob_refreshToken')
const refreshToken = () => {
  api
    .post('/auth/token-refresh', {
      accessToken: access,
      refreshToken: refresh,
    })
    .then((res) => {
      console.log('재발급 성공', res)
      const { account, accessToken } = res.data
      localStorage.setItem('Bob_accessToken', accessToken)
    })
    .catch((error) => {
      return console.log('재발급 실패', error)
    })
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
    // any status code that lie within the range of 2xx cause this function to trigger
    // do something with response data
    console.log(response)
    return response
  },
  function async(error) {
    // if (error.response.status === accessToken 만료일 때) {
    //   refreshToken()
    // }
    console.log(error)
    const { config } = error

    if (error.response.status && error.response.status === 401) {
      refreshToken()
    }
    return Promise.reject(error)
  }
)
