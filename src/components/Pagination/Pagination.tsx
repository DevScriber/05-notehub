import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from './Pagination.module.css'

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
    (ReactPaginateModule as unknown as Record<string, unknown>).default
        ? (ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>).default
        : (ReactPaginateModule as unknown as ComponentType<ReactPaginateProps>)
);

interface PaginationProps {
    totalPages: number,
    currentPage: number,
    setCurrentPage: (selected: number) => void
}

export default function Pagination({ totalPages, currentPage, setCurrentPage }: PaginationProps) {

    if (totalPages <= 1) return null;

    return (
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←" />
    )
}
