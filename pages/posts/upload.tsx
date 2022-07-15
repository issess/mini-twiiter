import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import useUser from "@libs/client/useUser";

interface UploadPostForm {
  description: string;
}
interface UploadPostMutation {
  ok: boolean;
  post: Post;
}
const Upload: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadPostForm>();
  const [uploadPost, { loading, data }] =
    useMutation<UploadPostMutation>("/api/posts");
  const onValid = (data: UploadPostForm) => {
    if (loading) return;
    uploadPost(data);
  };
  useEffect(() => {
    if (data?.ok) {
      console.log(data);
      router.push(`/posts/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="Upload Post">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <TextArea
          register={register("description")}
          name="description"
          required
        />
        <Button text={loading ? "Loading..." : "Tweet!"} />
      </form>
    </Layout>
  );
};

export default Upload;
