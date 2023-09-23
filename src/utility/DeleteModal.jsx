import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { clearDeleteId } from "../slices/commonSlice";

const DeleteModal = ({ deleteAction, loadList }) => {
    const dispatch = useDispatch();
    const { deleteId } = useSelector(state => state.common);
    const handleDelete = () => {
        deleteAction(deleteId)
            .then(response => {
                toast.success(response?.message);
                dispatch(clearDeleteId());
                loadList();
            })
            .catch(error => toast.warn(error.message));
    }
    return (
        <>
            <div className="modal fade" id="deleteModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                role="dialog"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <lord-icon
                                src="/assets/lord-icons/error.json"
                                trigger="loop"
                                style={{ width: '120px', height: '120px' }}
                            >
                            </lord-icon>

                            <div className="mt-4">
                                <h4 className="mb-3">Are you Sure?</h4>
                                <p className="text-muted mb-4"> Once deleted the data can't be recovered. <br />Please
                                    confirm
                                    before taking action.</p>
                                <div className="hstack gap-2 justify-content-center">
                                    <button type={'button'}
                                        className="btn btn-dark fw-medium"
                                        data-bs-dismiss="modal"
                                    >
                                        <strong>Close</strong>
                                    </button>
                                    &nbsp;
                                    <button type={'button'}
                                        onClick={handleDelete}
                                        className="btn btn-danger"
                                        data-bs-dismiss="modal"
                                    >
                                        <strong>Confirm</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

DeleteModal.propTypes = {
    deleteAction: PropTypes.any.isRequired,
    loadList: PropTypes.any.isRequired,
}

export default DeleteModal;
