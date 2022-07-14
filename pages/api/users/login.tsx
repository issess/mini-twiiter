import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { username, password } = req.body;
  const foundUser = await client.user.findUnique({
    where: {
      name: username,
    },
  });
  if (!foundUser) {
    return res.json({
      ok: false,
      message: "Username not found",
    });
  }
  const foundUserAndPassword = await client.user.findFirst({
    where: {
      name: username,
      password: password,
    },
  });
  if (!foundUserAndPassword) {
    return res.json({
      ok: false,
      message: "Password doesn't match",
    });
  }
  req.session.user = {
    id: foundUser.id,
  };
  await req.session.save();
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
