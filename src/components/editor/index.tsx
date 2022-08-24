import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

export default function Editor() {
  const [value, setValue] = useState("");
  return <ReactQuill value={value} onChange={setValue} />;
}
