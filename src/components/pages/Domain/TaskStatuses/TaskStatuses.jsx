import {toast, ToastContainer} from "react-toastify";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {setTableLoading} from "../../../../slices/commonSlice";
import {getTaskStatus, getTaskStatusList} from "../../../../actions/taskStatusApiActions";
import {setTaskStatusList} from "../../../../slices/taskStatusSlice";
import TaskStatusForm from "./TaskStatusForm";
import TaskStatusList from "./TaskStatusList";

const TaskStatuses = () => {
    const dispatch = useDispatch();
    const [formModal, setFormModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [taskStatusEdit, setTaskStatusEdit] = useState({});

    const toggleFormModal = () => setFormModal(!formModal);

    const loadTaskStatusList = (pagination) => {
        const params = {page: pagination?.page ?? 1};
        getTaskStatusList(params)
            .then(response => {
                dispatch(setTaskStatusList(response.data));
                dispatch(setTableLoading(false));
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        loadTaskStatusList();
    }, []);


    const handleRowClick = id => {
        setEditId(id);
        getTaskStatus(id)
            .then(response => {
                setTaskStatusEdit(response.data);
                toggleFormModal();
            })
            .catch(error => {
                console.error(error);
                toast.error(`Something went wrong.`);
            });
    }

    return <>
        <div className="row mt-5">
            <ToastContainer/>
            <div className="card">
                <div className="card-header d-flex justify-content-end">
                    <button className="btn btn-success btn-sm"
                            onClick={toggleFormModal}
                    >Create
                    </button>
                </div>
                <div className="card-body">
                    <TaskStatusList
                        loadTaskStatusList={loadTaskStatusList}
                        handleRowClick={handleRowClick}
                    />
                </div>
            </div>
            {formModal &&
                <TaskStatusForm
                    toggleFormModal={toggleFormModal}
                    formModal={formModal}
                    loadTaskStatusList={loadTaskStatusList}
                    editId={editId}
                    taskStatusEdit={taskStatusEdit}
                />
            }
        </div>
    </>
}

export default TaskStatuses;