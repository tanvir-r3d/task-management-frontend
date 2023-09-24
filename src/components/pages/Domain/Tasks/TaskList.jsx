import { useEffect, useState } from "react";
import { deleteTask, getTaskList } from "../../../../actions/taskApiActions";
import PaginateTable from "../../../../utility/PaginateTable";
import TableLoader from "../../../../utility/TableLoader";
import { generateSL } from "../../../../utility/helpers";
import DeleteButton from "../../../../utility/DeleteButton";
import DeleteModal from "../../../../utility/DeleteModal";
import { useSelector } from "react-redux";

const TaskList = ({ handleRowClick, loadTaskList }) => {

    const { taskList } = useSelector(state => state.task);
    const { tableLoading } = useSelector(state => state.common);

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
                                    <td style={{ cursor: 'pointer' }} onClick={() => handleRowClick(task.id)}>
                                        {generateSL(taskList.current_page, taskList.per_page, key)}
                                    </td>
                                    <td style={{ cursor: 'pointer' }} onClick={() => handleRowClick(task.id)}>
                                        {task.title}
                                    </td>
                                    <td style={{ cursor: 'pointer' }} onClick={() => handleRowClick(task.id)}>
                                        {task?.assignees?.map(x => x.name)?.join(',')}
                                    </td>
                                    <td style={{ cursor: 'pointer' }} onClick={() => handleRowClick(task.id)}>
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