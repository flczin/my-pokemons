import axios from 'axios'

const BASE_URL = "https://pokeapi.co/api/v2"

const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use(async (config) => {
    config.baseURL = `${BASE_URL}/`
    return config
}
)

export default api