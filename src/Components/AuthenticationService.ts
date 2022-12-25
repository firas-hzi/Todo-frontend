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
        sessionStorage.setItem('token', 'Bearer ' + token);
        return 'Bearer ' + token
    }

    
}

export default new AuthenticationService()