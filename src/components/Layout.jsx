import LeftBarTab from "./layouts/LeftBarTab";
import TopBar from "./layouts/TopBar";
import RightBar from "./layouts/RightBar";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import PrivateComponent from "./PrivateComponent";
import Tasks from "./pages/Domain/Tasks/Tasks";
import TaskStatuses from "./pages/Domain/TaskStatuses/TaskStatuses";
import {useDispatch, useSelector} from "react-redux";
import Verify from "./pages/Auth/Verify";
import {useEffect} from "react";
import axios from "axios";
import {API} from "../constants/app";
import {emailVerify, logout} from "../slices/authSlice";

const Layout = () => {
    const dispatch = useDispatch();
    const {isLoggedIn, isEmailVerified} = useSelector((state) => state.auth);
    const checkIsLoggedIn = () => {
        let token = localStorage.getItem('token');
        axios.get(`${API}/auth/me`, {
            headers: {'Authorization': 'Bearer ' + token}
        })
            .then(({data: {data}}) => {
                dispatch(emailVerify(data));
            })
            .catch(error => {
                if (error.status == 401) {
                    dispatch(logout());
                }
            })
    }
    useEffect(() => {
        checkIsLoggedIn();
    }, []);

    return (
        <>
            {isLoggedIn && isEmailVerified ? <div>
                <LeftBarTab/>
                <TopBar/>
                <div className="page-wrapper">
                    <div className="page-content-tab">
                        <div className="container-fluid">
                            <Routes>
                                <Route path="/home" element={
                                    <PrivateComponent>
                                        <Home/>
                                    </PrivateComponent>
                                }/>
                                <Route path="/tasks" element={
                                    <PrivateComponent>
                                        <Tasks/>
                                    </PrivateComponent>
                                }/>
                                <Route path="/task-statuses" element={
                                    <PrivateComponent>
                                        <TaskStatuses/>
                                    </PrivateComponent>
                                }/>
                            </Routes>
                        </div>
                        <RightBar/>
                        <Footer/>
                    </div>
                </div>
            </div> : <Verify/>}
        </>
    );
}

export default Layout;