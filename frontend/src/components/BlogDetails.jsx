import React, { useEffect } from "react";
import { useBlogsContext } from "../hooks/useBlogsHook";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

export function BlogDetails({ blog }) {
  const {dispatch} = useBlogsContext();
  const {user} = useAuthContext();

  const handleClick = async () => {
    if(!user){
      return;
    }

    const response = await fetch("/api/blog/" + blog._id, {
      method: 'DELETE',
    });
    const json = await response.json();
    if(response.ok){
      dispatch({type: 'DELETE_BLOG', payload: json});
    }
    
  }
  



  return (
    <div className=" m-2 p-2 min-h-32 bg-white rounded">
      <h1 className="font-medium text-lg m-2 inline-block ">{blog.title}</h1>
      
      <p className="m-2">{blog.body}</p>
      <p className="m-2">{blog.snippet}</p>
      <p>
        {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
      </p>
      <p className="m-2"><h3 className="font-semibold inline-block m-2">Created By : </h3>{blog.Createdby? blog.Createdby.email : 'Unknown'}</p>
      <button className="material-symbols-outlined ml-20" onClick={handleClick}>
        delete
      </button>
    </div>
  );
}

