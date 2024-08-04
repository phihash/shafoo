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
        const postsList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            createdAt: data.createdAt.toDate()
          };
        }
        ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        console.log("Posts list:", postsList);
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);
  const formatDate = (date: Date): string => {
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    const year = date.getFullYear().toString().slice(2);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}/${month}/${day}/(${dayOfWeek}) ${hours}:${minutes}`;
  }
  return (
    <>
    <h1 className="text-4xl">Shafoo</h1>
    <Form></Form>
    <>
        {posts.map((post, index) => (
          <>
          <p className="text-base">{formatDate(post.createdAt).toString()}</p>
          <span className="text-xl" key={index}>{post.username}さん</span>
          <p className="text-base">{post.text}</p>
          <hr />
          </>
        ))}
      </>
    </>
  );
}
