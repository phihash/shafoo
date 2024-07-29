"use client"
import Form from "./components/form";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // 適切なパスに変更

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching posts...");
        const querySnapshot = await getDocs(collection(db, "posts"));
        console.log("Query snapshot:", querySnapshot);
        const postsList = querySnapshot.docs.map(doc => doc.data());
        console.log("Posts list:", postsList);
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <>
    <h1 className="text-4xl">Shafoo</h1>
    <Form></Form>
    <>
        {posts.map((post, index) => (
          <>
          <span className="text-sm">{post.text}</span>
          <p className="text-lg" key={index}>{post.username}</p>
          </>
        ))}
      </>
    </>
  );
}
