import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import ErrorText from "../../../../utility/ErrorText";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {postTaskStatus, putTaskStatus} from "../../../../actions/taskStatusApiActions";
import {useEffect} from "react";

const TaskStatusForm = ({loadTaskStatusList, toggleFormModal, formModal, taskStatusEdit, editId}) => {

    const form = useFormik({
        initialValues: {
            name: '',
            color: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name Is Required'),
        }),
        onSubmit: (values, {resetForm}) => {
            let req = null;
            if (editId) {
                req = putTaskStatus(editId, values);
            } else {
                req = postTaskStatus(values);
            }

            req.then(response => {
                toggleFormModal();
                toast.success(response.message);
                resetForm();
                loadTaskStatusList();
            })
                .catch(error => {
                    toast.error("Something went wrong")
                    console.error(error);
                });
        }
    });

    useEffect(() => {
        form.setValues(taskStatusEdit);
    }, [editId]);

    return <>
        <Modal isOpen={formModal} toggle={toggleFormModal}>
            <ModalHeader toggle={toggleFormModal}>Task Status</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="name">Name <span style={{color: "red"}}>*</span></label>
                        <input type="text"
                               name="name"
                               className="form-control"
                               id="name"
                               onChange={form.handleChange}
                               onBlur={form.handleBlur}
                               value={form.values.name}
                        />
                        <ErrorText form={form} field={'name'}/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="color"><strong>Color</strong></label>
                        <input type="color"
                               name="color"
                               id="color"
                               className="form-control"
                               onChange={form.handleChange}
                               onBlur={form.handleBlur}
                               value={form.values.color}
                        />
                        <ErrorText form={form} field={'color'}/>
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
    </>
}

export default TaskStatusForm;