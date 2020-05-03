import fetch from "isomorphic-unfetch";
import useSWR from "swr";

const CSRSSR = ({ article }) => {
  const { data } = useSWR(
    "https://jsonplaceholder.typicode.com/posts/1",
    async (...args) => {
      const res = await fetch(...args);
      return res.json();
    },
    { initialData: article }
  );
  article = data;

  if (!article) {
    return <h1>isLoding....</h1>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <span>{article.body}</span>
    </div>
  );
};

CSRSSR.getInitialProps = async ({ req }) => {
  if (req) {
    const res = await (
      await fetch("https://jsonplaceholder.typicode.com/posts/1")
    ).json();
    return {
      article: res,
    };
  } else {
    return {};
  }
};

export default CSRSSR;
