import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { Post, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import useUser from "@libs/client/useUser";
import moment from "moment";

interface PostWithUser extends Post {
  user: User;
  _count: {
    favs: number;
  };
}
interface ItemDetailResponse {
  ok: boolean;
  post: PostWithUser;
  relatedPosts: Post[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/posts/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => {
      console.log(prev);
      return (
        prev && {
          ...prev,
          isLiked: !prev.isLiked,
          post: {
            ...prev.post,
            _count: {
              favs: prev.isLiked
                ? --prev.post._count.favs
                : ++prev.post._count.favs,
            },
          },
        }
      );
    }, false);
    // mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
    toggleFav({});
  };
  return (
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          <div className="flex justify-between border-b">
            <div className="flex cursor-pointer py-3 items-center space-x-3">
              <div className="h-12 w-12 bg-slate-300 rounded-full m-3 text-center text-2xl pt-2">
                {data?.post?.user?.name?.charAt(0).toLocaleUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {data?.post?.user?.name}
                </p>
                <span className="text-xs font-medium text-gray-500">
                  {moment(data?.post?.updatedAt).format("YYYY/MM/DD hh:mm")}
                </span>
              </div>
            </div>
          </div>
          <div>
            <p className=" my-6  text-gray-700">{data?.post?.description}</p>
          </div>

          <div className="mt-5 border-b">
            <div className="flex space-x-2 items-end justify-end mb-2">
              <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
                <button
                  onClick={onFavClick}
                  className={cls(
                    "p-3 rounded-md flex items-center hover:bg-gray-100 justify-center ",
                    data?.isLiked
                      ? "text-red-500  hover:text-red-600"
                      : "text-gray-400  hover:text-gray-500"
                  )}
                >
                  {data?.isLiked ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4 "
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  )}
                </button>
                <span>{data?.post?._count?.favs}</span>
              </div>
            </div>
            <div className="flex  space-x-2"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
