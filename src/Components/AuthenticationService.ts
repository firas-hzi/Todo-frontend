import axios from 'axios'
import { remoteUrl } from '../Types/URL'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeJwtAuthenticationService(email:string, password:string) {
        return axios.post(`${remoteUrl}/authenticate`, {
            email,
            password
        })
    }

    createJWTToken(token:string) {
        localStorage.setItem('token', 'Bearer ' + token);
        return 'Bearer ' + token
    }

    setupAxiosInterceptors(token:string) {

        axios.interceptors.request.use(
            (config) => {
             
                console.log(localStorage.getItem('token'));
                    config.headers!.authorization = localStorage.getItem('token');
            
                return config
            }
        )
    }

    
}

export default new AuthenticationService()