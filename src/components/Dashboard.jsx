import { useLocation } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout";
import Verify from "./pages/Auth/Verify";
import { getAuthUser } from "../actions/coreApiActions";
import { emailVerify, logout } from "../slices/authSlice";
import { useEffect } from "react";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, isEmailVerified } = useSelector((state) => state.auth);
    let { pathname } = useLocation();

    const checkIsLoggedIn = () => {
        getAuthUser()
            .then(response => {
                dispatch(emailVerify(response.data));
            })
            .catch(error => dispatch(logout()))
    }

    const renderElement = () => {
        if (pathname === "/register") {
            return <Register></Register>
        }
        if (!isLoggedIn && pathname === "/") {
            return <Login></Login>;
        }

        if (isLoggedIn && !isEmailVerified) {
            return <Verify checkIsLoggedIn={checkIsLoggedIn} />
        }
        return <Layout></Layout>
    }

    useEffect(() => {
        checkIsLoggedIn();
    }, []);
    return (
        <>

            {
                renderElement()
            }

        </>
    );
};


export default Dashboard;
