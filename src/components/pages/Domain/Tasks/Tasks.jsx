
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { getTask, getTaskList } from "../../../../actions/taskApiActions";
import TaskEditForm from "./TaskEditForm";
import { setTaskList } from "../../../../slices/taskSlice";
import { setTableLoading } from "../../../../slices/commonSlice";
import { useDispatch } from "react-redux";

const Tasks = () => {
    const dispatch = useDispatch();
    const [formModal, setFormModal] = useState(false);
    const [editFormModal, setEditFormModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [taskEdit, setTaskEdit] = useState({});

    const toggleFormModal = () => setFormModal(!formModal);

    const toggleEditFormModal = () => setEditFormModal(!editFormModal);

    const loadTaskList = (pagination) => {
        const params = { page: pagination?.page ?? 1 };
        getTaskList(params)
            .then(response => {
                dispatch(setTaskList(response.data));
                dispatch(setTableLoading(false));
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        loadTaskList();
    }, []);


    const handleRowClick = id => {
        setEditId(id);
        getTask(id)
            .then(response => {
                setTaskEdit(response.data);
                toggleEditFormModal();
            })
            .catch(error => {
                console.error(error);
                toast.error(`Something went wrong.`);
            });
    }

    return (<>
        <div className="row mt-5">
            <ToastContainer />
            <div className="card">
                <div className="card-header d-flex justify-content-end">
                    <button className="btn btn-success btn-sm"
                        onClick={toggleFormModal}
                    >Create</button>
                </div>
                <div className="card-body">
                    <TaskList
                        handleRowClick={handleRowClick}
                        loadTaskList={loadTaskList}
                    />
                </div>
            </div>
            {formModal &&
                <TaskForm
                    toggleFormModal={toggleFormModal}
                    formModal={formModal}
                    loadTaskList={loadTaskList}
                />
            }

            {editFormModal &&
                <TaskEditForm
                    toggleEditFormModal={toggleEditFormModal}
                    editFormModal={editFormModal}
                    taskEdit={taskEdit}
                    editId={editId}
                    loadTaskList={loadTaskList}
                />
            }
        </div>
    </>)
}

export default Tasks;