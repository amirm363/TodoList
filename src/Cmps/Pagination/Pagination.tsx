import Styles from "./Pagination.module.scss"
import React, { useState } from "react";

function Pagination(props: any) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = props.pages;

    // Create an array with the number of pages
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Handle pagination button click
    const handleClick = (page: any) => {
        props.setPageNumber(page)
        setCurrentPage(page);
    };

    return (
        <div className={Styles.PaginationContainer}>
            {/* Render pagination buttons */}
            {pageNumbers.map((page) => (
                <button key={page} onClick={() => handleClick(page)} className={page !== currentPage ? Styles.pageNumber : Styles.currentPageNumber} >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default Pagination;
