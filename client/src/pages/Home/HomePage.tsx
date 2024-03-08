import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export default function HomePage() {
  const [md, setMd] = useState<string>("");

  useEffect(() => {
    fetch("/INSTRUCTIONS.md")
      .then((res) => res.text())
      .then((text) => setMd(text));
  }, []);

  return (
    <div className="prose">
      <Markdown children={md} />
    </div>
  );
}
