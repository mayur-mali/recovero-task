import React from "react";
import { data } from "../../data";

export default function DummyData() {
  return (
    <div className="max-w-7xl gap-5 grid grid-cols-1 sm:grid-cols-2  mx-auto px-8">
      {data.map((post) => (
        <div
          className="bg-gray-200 col-span-1 p-2 h-40 rounded-md border shadow"
          key={post.id}
        >
          <p className="text-xl font-bold font-mono">Title : {post.title}</p>
          <p className="text-sm mt-2">Description : {post.body}</p>
        </div>
      ))}
    </div>
  );
}
