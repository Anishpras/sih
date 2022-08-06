import { NextApiRequest, NextApiResponse } from "next";
import { verifyJwt } from "../utils/jwt";
import { prisma } from "../utils/prisma";

interface CtxArbitrator {
  id: string;
  email: string;
  name: string;
  iat: string;
  exp: number;
}

function getArbitratorFromRequest(req: NextApiRequest) {
  const token = req.cookies.token;

  if (token) {
    try {
      const verified = verifyJwt<CtxArbitrator>(token);
      return verified;
    } catch (e) {
      return null;
    }
  }
}

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const arbitrator = getArbitratorFromRequest(req);

  return { req, res, prisma, arbitrator };
}

export type Context = ReturnType<typeof createContext>;
