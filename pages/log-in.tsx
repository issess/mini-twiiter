import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@components/layout";
import Head from "next/head";

interface LoginForm {
  username: string;
  password: string;
}

interface MutationResult {
  ok: boolean;
  result: string;
}
export default function CreateAccount() {
  const [login, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });
  const onSubmit = (data: LoginForm) => {
    login(data);
  };
  const router = useRouter();
  const [result, setResult] = useState("");
  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    } else {
      setResult(data?.message);
    }
  }, [data, router]);
  return (
    <Layout title="Login">
      <Head>
        <title>Login</title>
      </Head>
      <div className="py-10 px-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="rounded-md relative flex  items-center shadow-sm">
              <input
                className="appearance-none w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 shadow-sm shadow-slate-200"
                {...register("username", {
                  required: "Please write down your username.",
                  minLength: {
                    message: "Password has to be more than 2 chars",
                    value: 2,
                  },
                })}
                type="text"
                placeholder="Username"
              />
            </div>
            <div>
              <span className="text-sm text-red-500">
                {errors.username?.message}
              </span>
            </div>
          </div>
          <div>
            <div className="pt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="rounded-md relative flex  items-center shadow-sm">
                <input
                  className="appearance-none w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 shadow-sm shadow-slate-200"
                  {...register("password", {
                    required: "Please write down your password.",
                    minLength: {
                      message: "Password has to be more than 8 chars",
                      value: 8,
                    },
                  })}
                  type="password"
                  placeholder="**********"
                />
              </div>
              <span className="text-sm text-red-500">
                {errors.password?.message}
              </span>
            </div>
          </div>
          <div className="pt-8">
            <input
              className="w-full bg-slate-500 hover:bg-slate-600 text-white py-2 border border-transparent rounded-md shadow-lg shadow-slate-300 font-medium focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:outline-none"
              type="submit"
              value="Login"
            />
            <span className="text-sm text-red-500">{result}</span>
            <div className="flex items-center my-6 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">OR</p>
            </div>
            <Link href="/create-account">
              <button className="w-full bg-slate-500 hover:bg-slate-600 text-white py-2 border border-transparent rounded-md shadow-lg shadow-slate-300 font-medium focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:outline-none">
                Create an account
              </button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
