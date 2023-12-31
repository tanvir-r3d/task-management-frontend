import {Link} from "react-router-dom";

const Main = () => {
    return (
        <>
            <div style={{marginLeft: '22px', marginTop: '75px'}}>
                <div className="main-icon-menu-pane tab-pane">
                    <div className="title-box">
                        <h6 className="menu-title">Dashboard</h6>
                    </div>
                    <ul className="nav flex-column">

                        <li className="nav-item">
                            <Link className="nav-link" to="/tasks">Task</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/task-statuses">Task Status</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    );
};

export default Main;