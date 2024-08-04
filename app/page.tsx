"use client"
import Form from "./components/form";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // 適切なパスに変更
import { fredoka} from "./fonts";

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
    <h1 className={`text-4xl text-center ${fredoka} py-12`}>Shafoo</h1>
    <Form setPosts={setPosts} />
    <div className="w-11/12 md:w-11/12 mx-auto pt-16">
        {posts.map((post, index) => (
          <div className="my-4">
          <p className="text-base"> {index+1}. {formatDate(post.createdAt).toString()}</p>
          <span className="text-base block py-2" key={index}>名前：{post.username}さん</span>
          <p className="text-lg pb-4">{post.text}</p>
          <hr />
          </div>
        ))}
      </div>
    </>
  );
}
