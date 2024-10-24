import { useState, useRef, useMemo } from "react";
import { useBlogsContext } from "../hooks/useBlogsHook";
import { useAuthContext } from "../hooks/useAuthContext";
import JoditEditor from "jodit-react";

export function BlogForm({ setPopupAddNew }) {
  const editor = useRef(null);
  const config = useMemo(
    ()=>{
      return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder:"blog content here...",
      height: 400,
    };
  },
    []
  );

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
      <div className="relative w-full max-w-4xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800 p-6 border border-gray-600">
          <button
            onClick={() => setPopupAddNew(false)}
            className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            {/* <h3 className="mb text-2xl font-semibold text-gray-900 dark:text-gray-200">
              Add New Blog
            </h3> */}
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
                <label htmlFor="body"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Body
                </label>
                <JoditEditor
                  ref={editor}
                  value={body}
                  onChange={(e) => setBody(e)}
                  config={config}
                />
              </div>
              <div className="flex flex-col m-2 p-2">
                <label htmlFor="snippet"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Snippet</label>
                <textarea
                  rows={2}
                  onChange={(e) => setSnippet(e.target.value)}
                  value={snippet}
                  className={`w-full p-3 mt-1 text-sm rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300 ${
                    emptyFields.includes("snippet") ? "border-red-500" : ""
                  }`}
                  placeholder="Enter a short description or summary"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>

              {error && <div className="p-4 ml-4 text-red-500">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
