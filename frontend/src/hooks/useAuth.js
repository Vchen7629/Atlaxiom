import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode"

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let
}