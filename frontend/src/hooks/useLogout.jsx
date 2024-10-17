import { useAuthContext } from "./useAuthContext";
import { useBlogsContext } from "./useBlogsHook";

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: homeDispatch} = useBlogsContext()
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        homeDispatch({type: 'SET_BLOGS', payload: null})
    }

    return {logout}
}