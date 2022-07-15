import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { Post } from "@prisma/client";
import moment from "moment";
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
  herts;
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<PostsResponse>("/api/posts");
  return (
    <Layout>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.posts?.map((post) => (
          <div>
            <div className="flex cursor-pointer py-3 items-center space-x-3">
              <div className="w-full">
                <p className="px-2 text-sm font-medium text-gray-700">
                  @{post?.user?.name}
                </p>
                <Link href={`/posts/${post.id}`}>
                  <a>
                    <div className="p-2 m-2">{post.description}</div>
                  </a>
                </Link>
                <div className="flex justify-between">
                  <span className="px-2 text-xs font-medium text-gray-500">
                    {moment(post?.updatedAt).format("YYYY/MM/DD hh:mm")}
                  </span>
                  <div className="flex space-x-2 items-end justify-end">
                    <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                      </svg>
                      <span>{post._count.favs}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
