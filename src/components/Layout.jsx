import LeftBarTab from "./layouts/LeftBarTab";
import TopBar from "./layouts/TopBar";
import RightBar from "./layouts/RightBar";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import PrivateComponent from "./PrivateComponent";
import Tasks from "./pages/Domain/Tasks/Tasks";

const Layout = () => {
    return (
        <>
            <div>
                <LeftBarTab />
                <TopBar />
                <div className="page-wrapper">
                    <div className="page-content-tab">
                        <div className="container-fluid">
                            <Routes>
                                <Route path="/home" element={
                                    <PrivateComponent>
                                        <Home />
                                    </PrivateComponent>
                                } />
                                <Route path="/tasks" element={<Tasks />} />
                            </Routes>
                        </div>
                        <RightBar />
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Layout;