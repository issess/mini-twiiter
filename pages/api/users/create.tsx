import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { username, email, password } = req.body;
  const foundUserByName = await client.user.findUnique({
    where: {
      name: username,
    },
  });
  if (foundUserByName) {
    return res.json({
      ok: false,
      message: "name already exists",
    });
  }
  const foundUserByEmail = await client.user.findUnique({
    where: {
      email: email,
    },
  });
  if (foundUserByEmail) {
    return res.json({
      ok: false,
      message: "email already exists",
    });
  }
  await client.user.create({
    data: {
      name: username,
      email: email,
      password: password,
    },
  });
  return res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
