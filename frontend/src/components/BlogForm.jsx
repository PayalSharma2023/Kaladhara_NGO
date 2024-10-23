import { useState } from "react";
import { useBlogsContext } from "../hooks/useBlogsHook";
import { useAuthContext } from "../hooks/useAuthContext";

export function BlogForm({setPopupAddNew }) {
  const { dispatch } = useBlogsContext();

  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    if (!user) {
      setError("You must be logged in");
      return;
    }
    if (user.role === "user") {
      setError("Access denied");
      return;
    }
    const blog = { title, snippet, body };

    const response = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setSnippet("");
      setBody("");
      console.log("new blog added", json);
      dispatch({ type: "CREATE_BLOG", payload: json });
      // Close the form after successful submission
      setPopupAddNew(false);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-20">
    <div className="relative w-full max-w-md max-h-full">
      <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700 border border-gray-600">
        <button
          onClick={() => setPopupAddNew(false)}
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-gray-200">
            Add New Blog
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col m-2 p-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={`p-2 rounded ${
                  emptyFields.includes("title") ? "error" : ""
                }`}
                placeholder="Enter blog title"
              />
            </div>
            <div className="flex flex-col m-2 p-2">
              <label htmlFor="snippet">Snippet</label>
              <textarea
                rows={2}
                onChange={(e) => setSnippet(e.target.value)}
                value={snippet}
                className={`p-2 rounded ${
                  emptyFields.includes("snippet") ? "error" : ""
                }`}
                placeholder="Enter blog snippet"
              />
            </div>
            <div className="flex flex-col m-2 p-2">
              <label htmlFor="body">Body</label>
              <textarea
                rows={8}
                onChange={(e) => setBody(e.target.value)}
                value={body}
                className={`p-2 rounded ${
                  emptyFields.includes("body") ? "error" : ""
                }`}
                placeholder="Enter blog content"
              />
            </div>
            <button
              type="submit"
              className="ml-8 p-2 bg-green-600 rounded text-gray-200"
            >
              Submit
            </button>
            {error && <div className="p-4 ml-4 text-red-500">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}
