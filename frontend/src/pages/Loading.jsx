const Loading = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="lds-ripple inline-block relative w-20 h-20">
                <div className="absolute border-4 border-solid border-white opacity-100 rounded-[50%]"></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading;