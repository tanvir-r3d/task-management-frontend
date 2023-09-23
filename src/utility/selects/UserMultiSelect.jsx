import { useEffect, useState } from "react";
import { getUserSelect } from "../../actions/commonApiActions";
import Select from "react-select";

const UserMultiSelect = ({ value, onChange }) => {
    const [allUsers, setAllUsers] = useState([]);

    const fetchUsers = () => {
        getUserSelect()
            .then(response => {
                setAllUsers(response.data);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return <>
        <Select
            isMulti
            options={allUsers}
            value={value}
            onChange={onChange}
        />
    </>;
}
export default UserMultiSelect;