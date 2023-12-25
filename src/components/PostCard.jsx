import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  // console.log(appwriteService.getFilePreview(featuredImage));
  // console.log($id);
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full  bg-red-500 rounded-xl">
        <div className="w-full  justify-center ">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className=" w-full rounded-xl px-2 pt-2 max-h-60 object-cover"
          />
        </div>
        <h2 className="text-center text-xl  ">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
