import ReactPaginate from "react-paginate";
import css from './Pagination.module.css'

interface IPagination {
    totalPages: number,
    currentPage: number,
    setCurrentPage: (selected: number) => void
}

export default function Pagination({ totalPages, currentPage, setCurrentPage }: IPagination) {

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
