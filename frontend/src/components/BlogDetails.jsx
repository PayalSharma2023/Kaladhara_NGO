import React from "react";
import { useBlogsContext } from "../hooks/useBlogsHook";
import sanitizeHtml from 'sanitize-html'; // Import dompurify
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

export function BlogDetails({ blog }) {
  const { dispatch } = useBlogsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    // Add confirmation before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    const response = await fetch("/api/blog/" + blog._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_BLOG", payload: json });
    }
  };

  return (
    <div className="m-2 p-4 bg-white rounded shadow-lg">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-medium mb-2">{blog.title}</h1>

        {user && (
          <button
            className="material-symbols-outlined ml-20"
            onClick={handleClick}
          >
            delete
          </button>
        )}
      </div>
      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.body) }}/>
      {/* <p className="text-gray-600 mb-4">{blog.body}</p> */}
      <p className="text-gray-600 mb-2">{blog.snippet}</p>
      <p className="text-sm text-gray-500 mb-2">
        Created{" "}
        {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
      </p>
      <div className="flex items-center mb-2">
        <h3 className="font-semibold mr-2">Created By:</h3>
        <p className="text-gray-700">
          {blog.Createdby && blog.Createdby.email
            ? blog.Createdby.email
            : "Unknown"}
        </p>
      </div>
    </div>
  );
}
