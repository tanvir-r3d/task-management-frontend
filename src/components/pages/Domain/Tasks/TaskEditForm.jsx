import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

import UserMultiSelect from "../../../../utility/selects/UserMultiSelect";
import {useFormik} from "formik";
import TextEditor from "../../../../utility/TextEditor";
import StatusSelect from "../../../../utility/selects/StatusSelect";
import {getTaskCommentList, postTaskComment, putTask} from "../../../../actions/taskApiActions";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";

const TaskEditForm = ({toggleEditFormModal, editFormModal, taskEdit, editId, loadTaskList}) => {
    const [commentField, setCommentField] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [canEdit, setCanEdit] = useState(false);

    const form = useFormik({
        initialValues: {
            title: '',
            description: '',
            status_id: '',
            assignees: []
        },
        onSubmit: (values, {resetForm}) => {
            putTask(editId, values)
                .then(response => {
                    toggleEditFormModal();
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

    useEffect(() => {
        form.setValues({...taskEdit});
        form.setFieldValue('assignees', taskEdit?.assignee_users);
        setCanEdit(taskEdit.can_edit);
    }, [taskEdit]);

    const onCommentSubmit = () => {
        postTaskComment(editId, commentField)
            .then(response => {
                fetchComments();
                setCommentField('');
            })
            .catch(error => console.error(error));
    }

    const fetchComments = () => {
        getTaskCommentList(editId)
            .then(response => {
                setCommentList(response.data);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        fetchComments();
    }, [editId]);

    return <>
        <Modal isOpen={editFormModal} toggle={toggleEditFormModal} size="xl">
            <ModalHeader toggle={toggleEditFormModal}>Task</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-md-8 row">
                        <div className="col-md-4">
                            <label htmlFor="ticolourOptionstle"><strong>Title</strong></label>
                            {canEdit ?
                                <input type="text"
                                       name="title"
                                       className="form-control"
                                       id="title"
                                       onChange={form.handleChange}
                                       onBlur={form.handleBlur}
                                       value={form.values.title}
                                />
                                : <p>{taskEdit.title}</p>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="assignees"><strong>Assign To</strong></label>
                            {canEdit ?
                                <UserMultiSelect
                                    onChange={value => form.setFieldValue('assignees', value)}
                                    value={form.values.assignees}
                                />
                                : <p>{taskEdit?.assignee_users?.map(x => x.label).join(', ')}</p>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="status_id"><strong>Status</strong></label>
                            {canEdit ?
                                <StatusSelect
                                    onChange={value => form.setFieldValue('status_id', value)}
                                    value={form.values.status_id}
                                /> :
                                <p>{taskEdit.status.name}</p>
                            }
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="description"><strong>Description</strong></label>
                            {canEdit ?
                                <TextEditor
                                    value={form.values.description}
                                    onChange={value => form.setFieldValue('description', value)}
                                /> :
                                <p>{taskEdit.description}</p>
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <strong>Comments</strong>
                        <div className="card">
                            <div className="card-body" style={{
                                height: 'fit-content',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end'
                            }}>
                                <div style={{maxHeight: '300px', minHeight: '300px', overflowX: 'hidden'}}>
                                    {commentList.length > 0
                                        ? commentList.map((comment, key) => (
                                            <>
                                                <p key={key}>
                                                    <strong>{comment.user.name}</strong>
                                                    <br/>{comment.comment}
                                                </p>
                                            </>
                                        ))
                                        : <p style={{textAlign: 'center'}}>Comments will apear hear.</p>
                                    }
                                </div>
                                <div className="row" style={{paddingTop: '10px'}}>
                                    <div className="col-md-10">
                                        <input type="text"
                                               className="form-control form-control-sm"
                                               onChange={e => setCommentField(e.target.value)}
                                               value={commentField}
                                               onKeyDownCapture={(e) => e.key === 'Enter' && onCommentSubmit()}
                                        />
                                    </div>
                                    <div className="col-md-2 d-flex text-primary align-items-center">
                                        <i className="far fa-paper-plane"
                                           onClick={() => onCommentSubmit()}
                                           style={{fontSize: '18px', cursor: 'pointer'}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={form.handleSubmit}>
                    Save
                </Button>{' '}
                <Button color="secondary" onClick={toggleEditFormModal}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    </>;
}

export default TaskEditForm;