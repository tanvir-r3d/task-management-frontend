import {useEffect, useState} from "react";
import {postVerificationCode, postVerificationMail} from "../../../actions/coreApiActions";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../../slices/authSlice";

const Verify = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMailSend, setIsMailSend] = useState(false);
    const [sendingMail, setSendingMail] = useState(false);
    const [code, setCode] = useState('');

    const handleVerificationMailSend = () => {
        setSendingMail(true);
        postVerificationMail()
            .then(response => {
                toast.success(response.message);
                setIsMailSend(true);
            })
            .catch(error => {
                toast.error('Something went wrong.')
                console.error(error);
            })
            .finally(() => setSendingMail(false));
    }

    const handleLogOut = () => {
        dispatch(logout());
        navigate('/', {replace: true})
    }

    const checkVerificationCode = () => {
        postVerificationCode({code})
            .then(response => {
                if (response?.code == 200) {
                    toast.success(response.message);
                    window.location.reload();
                }
            })
            .catch(error => {
                if (error?.status == 406) {
                    toast.error(error?.data?.message);
                }
            })
    }

    // useEffect(() => {
    //     navigate('/', {replace: true});
    // }, []);

    return <>
        <ToastContainer/>
        <div className="container-md">
            <div className="row vh-100 d-flex justify-content-center">
                <div className="col-12 align-self-center">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-4 mx-auto">
                                <div className="card">
                                    <div className="card-body p-0 auth-header-box">
                                        <div className="text-center p-3">
                                        </div>
                                    </div>
                                    <div className="card-body pt-0">

                                        <div className="form-group mb-2">
                                            {isMailSend && <>
                                                <label className="form-label" htmlFor="code">
                                                    <strong>Code</strong>
                                                </label>
                                                <input type="text" className="form-control" id="code"
                                                       name="code" placeholder="Enter verification code"
                                                       value={code}
                                                       onChange={e => setCode(e.target.value)}
                                                />
                                            </>}
                                        </div>
                                        {/*end form-group*/}
                                        <div className="form-group mb-0 row">
                                            <div className="col-12">
                                                <div className="d-grid mt-3">
                                                    {isMailSend ?
                                                        <button
                                                            onClick={checkVerificationCode}
                                                            className="btn btn-primary"
                                                            type="button"
                                                        >
                                                            Log In
                                                            <i className="fas fa-sign-in-alt ms-1"/>
                                                        </button> : <>
                                                            <button className="btn btn-primary" type="button"
                                                                    onClick={handleVerificationMailSend}
                                                                    disabled={sendingMail}
                                                            >
                                                                {sendingMail ? 'Sending...' : 'Send Verification Mail'}
                                                            </button>
                                                        </>}
                                                </div>
                                            </div>
                                            {/*end col*/}
                                        </div>
                                        {/*end form-group*/}

                                        {/*end form*/}
                                        <div className="m-3 text-center text-muted">
                                            <button
                                                onClick={handleLogOut}
                                                className="btn btn-primary" disabled={sendingMail}
                                                type="button">Log Out
                                                <i className="fas fa-sign-out-alt ms-1"/>
                                            </button>
                                        </div>
                                    </div>
                                    {/*end card-body*/}
                                </div>
                                {/*end card*/}
                            </div>
                            {/*end col*/}
                        </div>
                        {/*end row*/}
                    </div>
                    {/*end card-body*/}
                </div>
                {/*end col*/}
            </div>
            {/*end row*/}
        </div>
    </>
};

export default Verify;