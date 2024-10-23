import {useNavigate} from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button
        type= 'button'
        onClick={() => navigate(-1)}
        className='absolute top-7 -left-10 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-600 dark:hover:bg-gary-700 dark:focus:ring-gray-800'
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
            </svg>
        </button>
    )
}

export default BackButton