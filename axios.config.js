import axios from 'axios'

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

const mainAxios = axios.create({
  baseURL: BASE_URL,
})

export default mainAxios
