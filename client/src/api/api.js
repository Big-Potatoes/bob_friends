import axios from 'axios'

// axios base url custom
export const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
})
