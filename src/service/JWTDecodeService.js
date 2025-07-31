import { jwtDecode } from "jwt-decode";
const _JWTDecodeService=(token)=>{
    const decoded = jwtDecode(token);

    
    return decoded;
}
export default _JWTDecodeService;