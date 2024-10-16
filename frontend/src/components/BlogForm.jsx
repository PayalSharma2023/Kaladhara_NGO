import { useState } from "react";
import { useBlogsContext } from "../hooks/useBlogsHook";

export function BlogForm() {
  const { dispatch } = useBlogsContext();

  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [form, setForm] = useState(true);

  const toggleForm = () => {
    setForm((prevForm) => !prevForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    const blog = {title, snippet, body};

    const response = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "content-Type" : "application/json",
      },
    });
    const json = await response.json();

    if(!response.ok){
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok){
      setError(null);
      setTitle("");
      setSnippet("");
      setBody("");
      console.log("new blog added", json);
      dispatch({type: "CREATE_BLOG", payload: json});
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={`w-96 m-4 ${form ? "hidden" : "block"}`}>
          <div className="flex flex-col m-2 p-2">
            <label htmlFor="title">title</label>
            <input 
            type="text" 
            onChange={(e)=>setTitle(e.target.value)}
            value={title} 
            className={emptyFields.includes('title') ? 'error p-2': 'p-2'}  
            />
          </div>
          <div className="flex flex-col m-2 p-2">
            <label htmlFor="snippet">snippet</label>
            <textarea rows={2} 
            onChange={(e)=>setSnippet(e.target.value)}
            value={snippet}
            className={emptyFields.includes('snippet') ? 'error': ''} 
            />
          </div>
          <div className="flex flex-col m-2 p-2">
            <label htmlFor="body">body</label>
            <textarea
            rows={8}
            onChange={(e)=>setBody(e.target.value)} 
            value={body}
            className={emptyFields.includes('body') ? 'error': ''} 
            />
          </div>
          <button
            type="submit"
            onClick={toggleForm}
            className={` ml-8 p-2 bg-green-600 rounded text-white`}
          >
            Submit
          </button>
          {error && <div className="p-4 ml-4 text-red-500">{error}</div>}
        </div>
      </form>
      <button
        type="button"
        onClick={toggleForm}
        className={` ml-8 p-2 bg-green-600 rounded text-white ${
          form ? "block" : "hidden"
        } `}
      >
        Add Blog
      </button>
    </div>
  );
}
