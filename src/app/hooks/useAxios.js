import { makeUseAxios } from "axios-hooks"
import api from "../services/axios"

const useAxios = makeUseAxios({
    axios: api,
})

export default useAxios