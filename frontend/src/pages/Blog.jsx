import React, { useEffect, useState } from "react";
import { BlogDetails } from "../components/BlogDetails";
import { BlogForm } from "../components/BlogForm";
import { usePopupState, useDebouce, usePagination } from "../hooks";
import { useBlogsContext } from "../hooks/useBlogsHook";
import {
  Button,
  BackButton,
  SearchInput,
  Pagination,
} from "../components";

const Blog = () => {
  const { blogs, dispatch } = useBlogsContext();
  // const { currentPage, setCurrentPage, displayedProducts, totalPages } =
  //   usePagination(blogs);
  const [popup, setPopupAddNew] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/api/blog");
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        dispatch({ type: "SET_BLOGS", payload: json });
      }
    };

    fetchBlogs();
  }, [dispatch]);

  //search filter
  const [searchUser, setSearchUser] = useState("");
  const searchDebouce = useDebouce(searchUser, 500);

  // useEffect(() => {
  //   const dataFilter = originalUser.filter((user) =>
  //     user.email.toLowerCase().includes(searchDebouce.toLowerCase())
  //   );
  //   dispatch(dataFilter);
  // }, [searchDebouce, originalUser]);
  return (
    <div className=" h-screen justify-between p-7 container relative">
      <BackButton />
      <div className="flex items-center justify-between pb-4">
        <SearchInput
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder="Search for blog by name"
        ></SearchInput>
        <Button onClick={() => setPopupAddNew(true)}>Add new</Button>

        {/* {setPopupAddNew && <BlogDetails/>} */}
      </div>
      <div>
        {blogs &&
          blogs
            .filter((blog) =>
              blog.title.toLowerCase().includes(searchDebouce.toLowerCase())
            )
            .map((blog) => <BlogDetails key={blog._id} blog={blog} />)}
      </div>
      {popup && <BlogForm setPopupAddNew={setPopupAddNew} />}
    </div>
  );
};

export default Blog;
