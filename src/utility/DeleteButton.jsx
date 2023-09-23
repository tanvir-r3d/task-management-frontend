import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setDeleteId } from "../slices/commonSlice";

const DeleteButton = ({ deleteId }) => {
    const dispatch = useDispatch();

    return (
        <>
            <i className="text-danger ti ti-trash"
                data-bs-toggle="modal" data-bs-target="#deleteModal"
                type="button"
                style={{ fontSize: '18px', cursor: 'pointer' }}
                onClick={() => dispatch(setDeleteId(deleteId))}
            />
        </>
    )
}
DeleteButton.propTypes = {
    deleteId: PropTypes.any.isRequired
}
export default DeleteButton;