import { Pagination } from "react-laravel-paginex";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PaginateTable = ({ children, action, data }) => {

    return (
        <div className="table-responsive">
            <SkeletonTheme
                baseColor="#ffffff"
                highlightColor="#d0c7e1d9"
                borderRadius="-3.5rem"
                duration={3}
            >
                <table
                    className={`table table-border table-sm table-hover table-stripe`}>
                    {children}
                </table>
                {data?.total > 15 && <Pagination changePage={action} data={data} />}
            </SkeletonTheme>
        </div>
    );
};

export default PaginateTable;