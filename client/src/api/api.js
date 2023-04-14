import axios from 'axios'

// axios base url, timeout custom
export const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 5000,
})
const access = localStorage.getItem('Bob_accessToken')
const refresh = localStorage.getItem('Bob_refreshToken')

// refresh token으로 access toekn 재발행
const refreshToken = async () => {
  try {
    const res = await api.post('/auth/token-refresh', {
      accessToken: access,
      refreshToken: refresh,
    })
    localStorage.setItem('Bob_accessToken', res.data.accessToken)
  } catch (error) {
    if (error.response.status === 500) {
      localStorage.removeItem('Bob_accessToken')
      localStorage.removeItem('Bob_refreshToken')
    }
  }
}

//* instance - request interceptor
api.interceptors.request.use(
  function (config) {
    // 토큰이 있으면 토큰을 설정
    if (access) {
      config.headers.Authorization = `Bearer ${access}`
    }
    return config
  },
  function (error) {
    // 요청에 에러가 있을 때 해야할 것
    return Promise.reject(error)
  }
)

//* instance - response interceptor
api.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const originalReq = error.config
    // 토큰 에러 일때 리프레시 토큰으로 access 다시 발급받고
    // 이전에 실패한 요청 config 저장해서 재요청 보내기
    if (error.response.status && error.response.status === 401) {
      try {
        await refreshToken()
        originalReq.headers.Authorization = `Bearer ${localStorage.getItem(
          'Bob_accessToken'
        )}`
        return axios(originalReq)
      } catch (error) {
        // todo: statusCode 따라서 공통 error handling 추가해야함
      }
    }
    return Promise.reject(error)
  }
)
