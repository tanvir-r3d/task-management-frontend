import { useEffect, useState } from "react";
import Select from "react-select";
import { getStatusSelect } from "../../actions/commonApiActions";

const StatusSelect = ({ onChange, value }) => {
    const [allStatus, setAllStatus] = useState([]);

    const fetchAllStatus = () => {
        getStatusSelect()
            .then(response => {
                setAllStatus(response.data);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        fetchAllStatus();
    }, []);

    return <>
        <Select
            options={allStatus}
            value={value && allStatus.find(x => x.value == value)}
            onChange={({ value }) => onChange(value)}
        />
    </>
}
export default StatusSelect;