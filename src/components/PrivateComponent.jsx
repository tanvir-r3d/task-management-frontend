import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getAuthUser} from "../actions/coreApiActions";

const PrivateComponent = ({children}) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/', {replace: true});
        }
    }, []);

    return children;
}

export default PrivateComponent;