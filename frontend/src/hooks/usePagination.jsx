import { useState } from "react";
const ITEMS_PER_PAGE = 10;

export default function usePagination(datas) {
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage + ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const displayedProducts = datas.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(datas.length / ITEMS_PER_PAGE);

    return {
        currentPage,
        setCurrentPage,
        displayedProducts,
        totalPages
    }
}