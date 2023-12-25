import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) setPosts(posts.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-col md:flex-row md:flex-wrap rounded-xl justify-center gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="lg:flex-row">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
