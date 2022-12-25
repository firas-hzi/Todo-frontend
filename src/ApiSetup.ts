import axios from "axios"
import { remoteUrl } from "./Types/URL"

const request = axios.create({
    baseURL: remoteUrl
})

request.interceptors.request.use(config => {
    console.log("token axios interceptor "+sessionStorage.getItem('token'));
                    config.headers!.authorization = sessionStorage.getItem('token');
return config
}, err => {
   console.log(err)
return Promise.reject(err)
})

export default request