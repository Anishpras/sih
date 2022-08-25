import dynamic from "next/dynamic";
import { useMemo } from "react";
const RichTextEditor = dynamic(() => import("@mantine/rte"), { ssr: false });
export default function Editor({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  // const people = [
  //   { id: 1, value: "Bill Horsefighter" },
  //   { id: 2, value: "Amanda Hijacker" },
  //   { id: 3, value: "Leo Summerhalter" },
  //   { id: 4, value: "Jane Sinkspitter" },
  // ];

  // const tags = [
  //   { id: 1, value: "JavaScript" },
  //   { id: 2, value: "TypeScript" },
  //   { id: 3, value: "Ruby" },
  //   { id: 3, value: "Python" },
  // ];
  // const mentions = useMemo(
  //   () => ({
  //     allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  //     mentionDenotationChars: ["/", "#"],
  //     source: (searchTerm, renderList, mentionChar) => {
  //       const list = mentionChar === "/" ? people : tags;
  //       const includesSearchTerm = list.filter((item) =>
  //         item.value.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //       renderList(includesSearchTerm);
  //     },
  //   }),
  //   []
  // );
  return (
    <RichTextEditor
      controls={[
        ["bold", "italic", "underline", "link", "image"],
        ["unorderedList", "h1", "h2", "h3"],
        ["sup", "sub"],
        ["alignLeft", "alignCenter", "alignRight"],
      ]}
      value={value}
      onChange={setValue}
      placeholder="Enter the order"
      // mentions={mentions}
    />
  );
}
