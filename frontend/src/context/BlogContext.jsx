import { createContext, useReducer } from "react";

export const BlogsContext = createContext();

export const blogReducer = (state, action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return {
        blogs: action.payload,
      };
    case "CREATE_BLOG":
      return {
        blogs: [action.payload, ...state.blogs],
      };
    case "DELETE_BLOG":
      return {
        blogs: state.blogs.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// children property represents the app component we wrapped inside index file
export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, {
    blogs: null,
  });

  return <BlogsContext.Provider value={{...state, dispatch}}>{children}</BlogsContext.Provider>;
};
