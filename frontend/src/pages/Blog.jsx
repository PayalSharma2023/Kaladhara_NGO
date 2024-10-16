import React, { useEffect } from "react";
import { BlogDetails } from "../components/BlogDetails";
import { BlogForm } from "../components/BlogForm";
import { useBlogsContext } from "../hooks/useBlogsHook";

const Blog = () => {
  const {blogs, dispatch} = useBlogsContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/api/blog");
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        dispatch({type: 'SET_BLOGS', payload: json})
      }
    };

    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="flex h-screen justify-between">
      <div className="">
        {blogs && blogs.map((blog) => <BlogDetails key={blog._id} blog={blog} />)}
      </div>
        <BlogForm />
    </div>
  );
};

export default Blog;
