import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface CreateUserForm {
  username: string;
  email: string;
  password: string;
}

interface MutationResult {
  ok: boolean;
  message: string;
}
export default function CreateAccount() {
  const [createUser, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/create");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserForm>({ mode: "onChange" });
  const onSubmit = (data: CreateUserForm) => {
    createUser(data);
  };
  const [result, setResult] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.push("/log-in");
    } else {
      setResult(data?.message);
    }
  }, [data, router]);
  return (
    <Layout>
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
          <div className="pt-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="rounded-md relative flex  items-center shadow-sm">
              <input
                className="appearance-none w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 shadow-sm shadow-slate-200"
                {...register("email", {
                  required: "Please write down your email.",
                  validate: {
                    notEmail: (value) =>
                      value.includes("@") || "Only emails allowed",
                  },
                })}
                type="email"
                placeholder="....@gmail.com"
              />
            </div>
            <div>
              <span className="text-sm text-red-500">
                {errors.email?.message}
              </span>
            </div>
          </div>
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
          <div className="pt-8">
            <input
              className="w-full bg-slate-500 hover:bg-slate-600 text-white py-2 border border-transparent rounded-md shadow-lg shadow-slate-300 font-medium focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:outline-none"
              type="submit"
              value="Create an account"
            />
            <span className="text-sm text-red-500">{result}</span>
          </div>
        </form>
      </div>
    </Layout>
  );
}
