import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API } from "../../../constants/app";
import { toast } from "react-toastify";

const Register = () => {

    let navigate = useNavigate();

    const regForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            national_id: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name Is Required'),
            email: Yup.string().email().required('Email Is Required'),
            password: Yup.string().required('Password Is Required'),
        }),
        onSubmit: (values, { resetForm }) => {
            axios.post(`${API}/users`, values)
                .then((response) => {
                    toast.success("Registration Successfully.");
                    resetForm({ values: '' });
                    navigate('/', { replace: true });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    const loginRedirect = () => {
        navigate('/', { replace: true });
    };


    return (
        <>
            <div className="container-md">
                <div className="row vh-100 d-flex justify-content-center">
                    <div className="col-12 align-self-center">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-4 mx-auto">
                                    <div className="card">
                                        <div className="card-body pt-0">
                                            <form className="my-4"
                                                onSubmit={regForm.handleSubmit}>
                                                <div className="form-group mb-2">
                                                    <label className="form-label" htmlFor="name">Name</label>
                                                    <input type="text" className="form-control" id="name"
                                                        onChange={regForm.handleChange}
                                                        onBlur={regForm.handleBlur}
                                                        value={regForm.values.name}
                                                        name="name" placeholder="Enter Your Name" />

                                                    <div className="text-danger">
                                                        {
                                                            regForm.touched.name &&
                                                            regForm.errors.name &&
                                                            (<div>{regForm.errors.name}</div>)
                                                        }
                                                    </div>

                                                </div>

                                                <div className="form-group mb-2">
                                                    <label className="form-label" htmlFor="email">Email</label>
                                                    <input type="text" className="form-control" id="email"
                                                        onChange={regForm.handleChange}
                                                        onBlur={regForm.handleBlur}
                                                        value={regForm.values.email}
                                                        name="email" placeholder="Enter Your Email" />

                                                    <div className="text-danger">
                                                        {
                                                            regForm.touched.email &&
                                                            regForm.errors.email &&
                                                            (<div>{regForm.errors.email}</div>)
                                                        }
                                                    </div>

                                                </div>

                                                {/*end form-group*/}
                                                <div className="form-group">
                                                    <label className="form-label"
                                                        htmlFor="password">Password</label>
                                                    <input type="password" className="form-control" name="password"
                                                        onChange={regForm.handleChange}
                                                        onBlur={regForm.handleBlur}
                                                        value={regForm.values.password}
                                                        id="password" placeholder="Enter password" />

                                                    <div className="text-danger">
                                                        {
                                                            regForm.touched.password &&
                                                            regForm.errors.password &&
                                                            (<div>{regForm.errors.password}</div>)
                                                        }
                                                    </div>

                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label"
                                                        htmlFor="userpassword">Confirm Password</label>
                                                    <input type="password" className="form-control" name="password"
                                                        id="userpassword" placeholder="Enter Confirm password" />
                                                </div>
                                                
                                                <div className="form-group mb-0 row">
                                                    <div className="col-12">
                                                        <div className="d-grid mt-3">
                                                            <button
                                                                className="btn btn-primary"
                                                                ttype="submit">Register <i
                                                                    className="fas fa-sign-in-alt ms-1" /></button>
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                </div>
                                                {/*end form-group*/}
                                            </form>
                                            {/*end form*/}
                                            <hr className="hr-dashed mt-4" />
                                            <div className="text-center mt-n5">
                                                <h6 className="card-bg px-3 my-4 d-inline-block">Or Login</h6>
                                            </div>


                                            <div className="form-group mb-0 row">
                                                <div className="col-12">
                                                    <div className="d-grid mt-3">
                                                        <button onClick={loginRedirect} className="btn btn-success"
                                                            type="button">Login <i
                                                                className="fas fa-sign-in-alt ms-1" /></button>
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                            </div>

                                            {/* <div className="d-flex justify-content-center mb-1">
                                                <a href="#" className="d-flex justify-content-center align-items-center thumb-sm bg-soft-primary rounded-circle me-2">
                                                    <i className="fab fa-facebook align-self-center"/>
                                                </a>
                                                <a href="#" className="d-flex justify-content-center align-items-center thumb-sm bg-soft-info rounded-circle me-2">
                                                    <i className="fab fa-twitter align-self-center"/>
                                                </a>
                                                <a href="#" className="d-flex justify-content-center align-items-center thumb-sm bg-soft-danger rounded-circle">
                                                    <i className="fab fa-google align-self-center"/>
                                                </a>
                                            </div> */}
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
    );

}

export default Register;