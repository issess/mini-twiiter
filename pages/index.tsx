import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

interface PostWithCount extends Post {
  _count: {
    favs: number;
  };
}
interface PostsResponse {
  ok: boolean;
  posts: PostWithCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<PostsResponse>("/api/posts");
  return (
    <Layout>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.posts?.map((post) => (
          <Link href={`/posts/${post.id}`}>
            <a>
              <div className="p-2 m-2">{post.description}</div>
              <div>{post._count.favs}</div>
            </a>
          </Link>
        ))}

        <FloatingButton href="/posts/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};
export default Home;
