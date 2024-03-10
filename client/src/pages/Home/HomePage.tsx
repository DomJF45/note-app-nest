import { useEffect, useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";

const INSTRUCTIONS = "/INSTRUCTIONS.md";

export default function HomePage() {
  // state for setting markdown
  const [md, setMd] = useState<string>("");

  // fetch text from public/INSTRUCTION.md
  useEffect(() => {
    fetch(INSTRUCTIONS)
      .then((res) => res.text())
      .then((text) => setMd(text));
  }, []);

  return (
    <div className="prose">
      <Link
        to={"/notes"}
        className="flex items-center gap-1 w-max hover:scale-[1.1] ease-in duration-75"
      >
        <p>Go to notes</p>
        <HiChevronRight className="w-5 h-5" />
      </Link>
      <Markdown children={md} />
    </div>
  );
}
