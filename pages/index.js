import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import Link from "next/link";

export default function Home() {
  const { data: articleList } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    async (...args) => {
      const res = await fetch(...args);
      return res.json();
    }
  );

  if (!articleList) {
    return <h1>Loding...</h1>;
  }

  return (
    <div className="grid">
      {console.log(articleList)}
      {articleList.map((value) => (
        <Link href="/posts/[id]" as={`/posts/${value.id}`}>
          <a>
            <h3>{value.title} &rarr;</h3>
          </a>
        </Link>
      ))}
    </div>
  );
}
