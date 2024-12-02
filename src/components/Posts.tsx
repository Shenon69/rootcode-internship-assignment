"use client"

import { IPost } from "@/types/post";
import { getAllPosts } from "@/utils/getAllPosts";
import { useEffect, useState } from "react";
import Post from "./Post";

export default function Posts() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetchPosts();
  }, [])

  const fetchPosts = async () => {
    try {
      const posts = await getAllPosts();
      console.log("posts:", posts);
      setPosts(posts);
    } catch (e) {
      console.error("Error fetching posts:", e);
    }
  }

  return (
    <div className="flex flex-col gap-2 lg:gap-4 justify-center items-center">
      {posts.map((post) => (
        <Post key={post.id} title={post.title} body={post.body} id={post.id} />
      ))}
    </div>
  );
}
