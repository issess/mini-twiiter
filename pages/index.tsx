import useUser from "@libs/client/useUser";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import useSWR from "swr";

interface ProductWithCount extends Post {
  _count: {
    favs: number;
  };
}
interface PostsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<PostsResponse>("/api/posts");
  return (
    <div>
      <div>
        <div className="w-full h-16 max-w-xl justify-center px-10 border-b fixed text-slate-800 flex items-center">
          <div className="absolute right-4">
            <div className="font-medium px-5 py-1 m-2 bg-slate-200 rounded-2xl">
              Post
            </div>
          </div>
          <span className="text-3xl font-semibold">Mini Twitter</span>
        </div>
      </div>
      <div className="flex pt-16 flex-col space-y-5 divide-y">
        {data?.posts?.map((post) => (
          <div className="p-2 m-2">${post.title}</div>
        ))}
        <div className="p-2 m-2">List0</div>
        <div className="p-2 m-2">List1</div>
        <div className="p-2 m-2">List2</div>
        <div className="p-2 m-2">List3</div>
        <div className="p-2 m-2">List4</div>
        <div className="p-2 m-2">List5</div>
      </div>
    </div>
  );
};
export default Home;
