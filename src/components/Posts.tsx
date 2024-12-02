"use client"

import { IPost } from "@/types/post";
import { getAllPosts } from "@/utils/getAllPosts";
import { useEffect, useState } from "react";
import Post from "./Post";

export default function Posts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPosts();
  }, [])

  const fetchPosts = async () => {
    try {
      const posts = await getAllPosts();
      console.log("posts:", posts);
      setPosts(posts);
      setLoading(false);
    } catch (e) {
      console.error("Error fetching posts:", e);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 lg:gap-4 justify-center items-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        posts.map((post) => (
          <Post key={post.id} title={post.title} body={post.body} id={post.id} />
        ))
      )}
    </div>
  );
}
