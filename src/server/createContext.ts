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
interface CtxClient {
  id: string;
  email: string;
  name: string;
  iat: string;
  exp: number;
}
interface CtxArbitrationCentre {
  id: string;
  email: string;
  name: string;
  iat: string;
  exp: number;
}

function getArbitratorFromRequest(req: NextApiRequest) {
  const token = req.cookies.arbitratorToken;

  if (token) {
    try {
      const verified = verifyJwt<CtxArbitrator>(token);
      return verified;
    } catch (e) {
      return null;
    }
  }
}
function getClientFromRequest(req: NextApiRequest) {
  const token = req.cookies.clientToken;

  if (token) {
    try {
      const verified = verifyJwt<CtxClient>(token);
      return verified;
    } catch (e) {
      return null;
    }
  }
}
function getArbitrationCentreFromRequest(req: NextApiRequest) {
  const token = req.cookies.arbitrationCentreToken;

  if (token) {
    try {
      const verified = verifyJwt<CtxArbitrationCentre>(token);
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
  const client = getClientFromRequest(req);
  const arbitrationCentre = getArbitrationCentreFromRequest(req);
  return { req, res, prisma, arbitrator, client, arbitrationCentre };
}

export type Context = ReturnType<typeof createContext>;
