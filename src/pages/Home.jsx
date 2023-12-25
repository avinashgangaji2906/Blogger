import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
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

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="w-full p-2">
              <h1 className="text-2xl hover:text-blue-500">
                Login and add posts !
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap rounded-xl justify-center">
          {posts.map((post) => (
            <div key={post.$id} className="w-1/5  m-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
