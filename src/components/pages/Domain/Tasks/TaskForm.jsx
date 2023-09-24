import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import UserMultiSelect from "../../../../utility/selects/UserMultiSelect";
import { useFormik } from "formik";
import TextEditor from "../../../../utility/TextEditor";
import StatusSelect from "../../../../utility/selects/StatusSelect";
import { postTask } from "../../../../actions/taskApiActions";
import { toast } from "react-toastify";

const TaskForm = ({ toggleFormModal, formModal, loadTaskList }) => {

    const form = useFormik({
        initialValues: {
            title: '',
            description: '',
            status_id: '',
            assignees: []
        },
        onSubmit: (values, { resetForm }) => {
            postTask(values)
                .then(response => {
                    toggleFormModal();
                    toast.success(response.message);
                    resetForm();
                    loadTaskList();
                })
                .catch(error => {
                    toast.error("Something went wrong")
                    console.error(error);
                });
        }
    });

    return <>
        <Modal isOpen={formModal} toggle={toggleFormModal} size="lg">
            <ModalHeader toggle={toggleFormModal}>Task</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="ticolourOptionstle">Title</label>
                        <input type="text"
                            name="title"
                            className="form-control"
                            id="title"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            value={form.values.title}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="assignees">Assign To</label>
                        <UserMultiSelect
                            onChange={value => form.setFieldValue('assignees', value)}
                            value={form.values.assignees}
                        />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="status_id">Status</label>
                        <StatusSelect
                            onChange={value => form.setFieldValue('status_id', value)}
                            value={form.values.status_id}
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="description">Description</label>
                        <TextEditor
                            value={form.values.description}
                            onChange={value => form.setFieldValue('description', value)}
                        />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={form.handleSubmit}>
                    Save
                </Button>{' '}
                <Button color="secondary" onClick={toggleFormModal}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    </>;
}

export default TaskForm;