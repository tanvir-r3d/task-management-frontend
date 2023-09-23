
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { getTask } from "../../../../actions/taskApiActions";
import TaskEditForm from "./TaskEditForm";

const Tasks = () => {
    const [formModal, setFormModal] = useState(false);
    const [editFormModal, setEditFormModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [taskEdit, setTaskEdit] = useState({});

    const toggleFormModal = () => setFormModal(!formModal);

    const toggleEditFormModal = () => setEditFormModal(!editFormModal);

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
                    />
                </div>
            </div>

            <TaskForm
                toggleFormModal={toggleFormModal}
                formModal={formModal}
            />

            <TaskEditForm
                toggleEditFormModal={toggleEditFormModal}
                editFormModal={editFormModal}
                taskEdit={taskEdit}
                editId={editId}
            />
        </div>
    </>)
}

export default Tasks;