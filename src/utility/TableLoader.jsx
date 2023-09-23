import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const TableLoader = ({numberOfRows, numberOfCols}) => {
    return (
        <>
            {[...Array(numberOfRows)].map((row, i) => {
                return (
                    <tr key={i}>
                        {[...Array(numberOfCols)].map((cols, j) => {
                            return (
                                <td>
                                    <Skeleton/>
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
        </>
    );
};

export default TableLoader;