"use client"
import React, { useState } from "react";
import { noto_sans_jp } from "../fonts";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

// eslint-disable-next-line react/display-name
const Form = () => {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  const  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ここでフォームのデータを送信する処理を追加
    if (text.trim() === "" || username.trim() === "") {
      // テキストが空の場合は投稿しない
      alert("投稿内容が空です")
      return;
    }
    try {
      await addDoc(collection(db, "posts"), {
        username,
        text,
        createdAt: new Date(),
      });
      setUsername("");
      setText("");
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert(`Error adding document: ${(error as Error).message}`);
    }
    console.log("Username:", username);
    console.log("Text:", text);
    setUsername("");
    setText("");
  };

    return (
      <form  onSubmit={handleSubmit}  className={noto_sans_jp.className}>
      <h2 className="text-xl text-center">
        フォーム
      </h2>
      <div>
        <input
          className="block w-1/3 mx-auto mt-6 p-4 border outline-slate-600"
          type="text"
          id="username"
          name="username"
          value={username}
          placeholder="名前"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <textarea
          className="block w-1/3 mx-auto my-8 p-4 border outline-slate-600"
          id="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="投稿内容"
          required
        ></textarea>
      </div>
      <button className="block mx-auto border outline-slate-600 p-4" type="submit">投稿</button>
    </form>
    );
 };



export default Form;
