import {useNavigate} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from "react-redux";
import {logout} from "../../slices/authSlice";

const TopBar = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/', {replace: true})
    }


    return (
        <>
            <div className="topbar">
                {/* Navbar */}
                <ToastContainer/>
                <nav className="navbar-custom" id="navbar-custom">
                    <ul className="list-unstyled topbar-nav float-end mb-0">
                        <li className="dropdown">
                            <a className="nav-link dropdown-toggle nav-user" data-bs-toggle="dropdown" href="#"
                               role="button" aria-haspopup="false" aria-expanded="false">
                                <div className="d-flex align-items-center">
                                    <img src="assets/images/users/user-4.jpg" alt="profile-user"
                                         className="rounded-circle me-2 thumb-sm"/>
                                    <div>
                                        <small className="d-none d-md-block font-11">Admin</small>
                                        <span className="d-none d-md-block fw-semibold font-12">Maria Gibson <i
                                            className="mdi mdi-chevron-down"/></span>
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#"><i
                                    className="ti ti-user font-16 me-1 align-text-bottom"/> Profile</a>
                                <a className="dropdown-item" href="#"><i
                                    className="ti ti-settings font-16 me-1 align-text-bottom"/> Settings</a>
                                <div className="dropdown-divider mb-0"/>
                                <a onClick={handleLogout} className="dropdown-item" href="#"><i
                                    className="ti ti-power font-16 me-1 align-text-bottom"/> Logout</a>
                            </div>
                        </li>

                    </ul>
                    {/*end topbar-nav*/}
                    <ul className="list-unstyled topbar-nav mb-0">
                        <li>
                            <button className="nav-link button-menu-mobile nav-icon" id="togglemenu">
                                <i className="ti ti-menu-2"/>
                            </button>
                        </li>
                    </ul>
                </nav>
                {/* end navbar*/}
            </div>
        </>
    );
};

export default TopBar;