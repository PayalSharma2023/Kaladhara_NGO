import { BlogsContext } from "../context/BlogContext"
import { useContext } from "react"

export const useBlogsContext = () => {
    const context = useContext(BlogsContext)

    if (!context) {
        throw Error('useBlogContext must be used inside an BlogContextProvider')
    }

    return context
}