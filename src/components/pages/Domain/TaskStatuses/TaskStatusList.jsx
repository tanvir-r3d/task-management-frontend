import DeleteModal from "../../../../utility/DeleteModal";
import PaginateTable from "../../../../utility/PaginateTable";
import TableLoader from "../../../../utility/TableLoader";
import {generateSL} from "../../../../utility/helpers";
import DeleteButton from "../../../../utility/DeleteButton";
import {useSelector} from "react-redux";
import {deleteTaskStatus} from "../../../../actions/taskStatusApiActions";

const TaskStatusList = ({handleRowClick, loadTaskStatusList}) => {
    const {taskStatusList} = useSelector(state => state.taskStatus);
    const {tableLoading} = useSelector(state => state.common);
    return (<>
        <DeleteModal
            deleteAction={deleteTaskStatus}
            loadList={loadTaskStatusList}
        />
        <PaginateTable
            action={loadTaskStatusList}
            data={taskStatusList}
        >
            <thead>
            <tr>
                <th>Sl</th>
                <th>Name</th>
                <th>Color</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {tableLoading ? <TableLoader numberOfCols={5} numberOfRows={10}/> : (
                <>
                    {taskStatusList?.data && taskStatusList?.data?.length > 0
                        ? taskStatusList.data.map((taskStatus, key) => <>
                            <tr key={key}>
                                <td style={{cursor: 'pointer'}} onClick={() => handleRowClick(taskStatus.id)}>
                                    {generateSL(taskStatusList.current_page, taskStatusList.per_page, key)}
                                </td>
                                <td style={{cursor: 'pointer'}} onClick={() => handleRowClick(taskStatus.id)}>
                                    {taskStatus.name}
                                </td>
                                <td style={{cursor: 'pointer'}} onClick={() => handleRowClick(taskStatus.id)}>
                                    <span className="badge" style={{backgroundColor: taskStatus.color}}>
                                        {taskStatus.color}
                                    </span>
                                </td>
                                <td>
                                    <DeleteButton deleteId={taskStatus.id}/>
                                </td>
                            </tr>
                        </>)
                        : (
                            <tr>
                                <td colSpan={5} style={{textAlign: 'center'}}>No Data Available.</td>
                            </tr>
                        )
                    }
                </>
            )}

            </tbody>
        </PaginateTable>
    </>);
}

export default TaskStatusList;