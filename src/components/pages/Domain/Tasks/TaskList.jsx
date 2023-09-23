import { useEffect, useState } from "react";
import { deleteTask, getTaskList } from "../../../../actions/taskApiActions";
import PaginateTable from "../../../../utility/PaginateTable";
import TableLoader from "../../../../utility/TableLoader";
import { generateSL } from "../../../../utility/helpers";
import DeleteButton from "../../../../utility/DeleteButton";
import DeleteModal from "../../../../utility/DeleteModal";

const TaskList = ({ handleRowClick }) => {
    const [taskList, setTaskList] = useState();
    const [tableLoading, setTableLoading] = useState(true);

    const loadTaskList = (pagination) => {
        const params = { page: pagination?.page ?? 1 };
        getTaskList(params)
            .then(response => {
                setTaskList(response.data);
                setTableLoading(false);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        loadTaskList();
    }, []);



    return (<>
        <DeleteModal
            deleteAction={deleteTask}
            loadList={loadTaskList}
        />
        <PaginateTable
            action={loadTaskList}
            data={taskList}
        >
            <thead>
                <tr>
                    <th>Sl</th>
                    <th>Title</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {tableLoading ? <TableLoader numberOfCols={5} numberOfRows={10} /> : (
                    <>
                        {taskList?.data && taskList?.data?.length > 0
                            ? taskList.data.map((task, key) => <>
                                <tr key={key}>
                                    <td onClick={() => handleRowClick(task.id)}>
                                        {generateSL(taskList.current_page, taskList.per_page, key)}
                                    </td>
                                    <td onClick={() => handleRowClick(task.id)}>
                                        {task.title}
                                    </td>
                                    <td onClick={() => handleRowClick(task.id)}>
                                        {task?.assignees?.map(x => x.name)?.join(',')}
                                    </td>
                                    <td onClick={() => handleRowClick(task.id)}>
                                        <span className="badge" style={{ backgroundColor: task?.status?.color ?? 'blue' }}>
                                            {task?.status?.name}
                                        </span>
                                    </td>
                                    <td>
                                        <DeleteButton deleteId={task.id} />
                                    </td>
                                </tr>
                            </>)
                            : (
                                <tr>
                                    <td colSpan={5}>No Data Available.</td>
                                </tr>
                            )
                        }
                    </>
                )}

            </tbody>
        </PaginateTable>
    </>);
}
export default TaskList;