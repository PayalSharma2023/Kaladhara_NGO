const activePageButton = "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white";

const Pagination = ({ currentPage, totalPages, setPage }) => {
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    const prevPageChange = () => {
        if (currentPage !== 1) {
            setPage(currentPage - 1);
        }
    }
    const nextPageChange = () => {
        if (currentPage !== totalPages) {
            setPage(currentPage + 1);
        }
    }
    return (
        <nav className="flex items-center justify-center mt-4">
            <ul className="inline-flex -space-x-px text-sm h-8">
                <li>
                    <button className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={prevPageChange}>Previous</button>
                </li>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <li key={index}>
                        <button
                            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === index + 1 ? activePageButton : "dark:bg-gray-800 dark:text-gray-400"}`} 
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li>
                    <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={nextPageChange}>Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination