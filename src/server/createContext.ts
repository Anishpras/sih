import { NextApiRequest, NextApiResponse } from "next";
import { verifyJwt } from "../utils/jwt";
import { prisma } from "../utils/prisma";

interface CtxArbitrator {
  id: string;

  name: string;
  iat: string;
  exp: number;
  registrationId: string;
}
interface CtxClient {
  id: string;
  username: string;
  name: string;
  iat: string;
  exp: number;
}
interface CtxArbitrationCentre {
  id: string;
  arbitrationCentreId: string;
  name: string;
  iat: string;
  exp: number;
}
interface CtxAdmin {
  id: string;
  name: string;
  username: string;
  adminId:string;
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
function getAdminFromRequest(req: NextApiRequest) {
  const token = req.cookies.adminToken;

  if (token) {
    try {
      const verified = verifyJwt<CtxAdmin>(token);
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
  const admin = getAdminFromRequest(req);
  return { req, res, prisma, arbitrator, client, arbitrationCentre, admin };
}

export type Context = ReturnType<typeof createContext>;
