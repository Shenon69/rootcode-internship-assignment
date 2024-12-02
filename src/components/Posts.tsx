"use client";

import { IPost } from "@/types/post";
import { getAllPosts } from "@/utils/getAllPosts";
import { useEffect, useState } from "react";
import Post from "./Post";
import { Search } from "lucide-react";

export default function Posts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerCaseQuery) ||
          post.body.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  const fetchPosts = async () => {
    try {
      const posts = await getAllPosts();
      console.log("posts:", posts);
      setPosts(posts);
      setFilteredPosts(posts);
      setLoading(false);
    } catch (e) {
      console.error("Error fetching posts:", e);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 lg:gap-4 justify-center items-center">
      <div className="w-full flex gap-2 items-center max-w-md">
        <Search />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts by title or body..."
          className="w-full p-2 border border-gray-300 rounded-full"
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Post key={post.id} title={post.title} body={post.body} id={post.id} />
        ))
      ) : (
        <div>No posts found</div>
      )}
    </div>
  );
}
