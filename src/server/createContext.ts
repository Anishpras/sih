import { NextApiRequest, NextApiResponse } from "next";
import { verifyJwt } from "../utils/jwt";
import { prisma } from "../utils/prisma";

interface CtxArbitrator {
  id: string;
  name: string;
  iat: string;
  exp: number;
  registrationId: string;
  adminId: string;
  arbitrationCentreId: string;
}
interface CtxClient {
  id: string;
  username: string;
  name: string;
  caseId: string;
  iat: string;
  exp: number;
}

interface CtxMediationParty {
  id: string;
  username: string;
  name: string;
  mediationCaseId: string;
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

interface CtxMediationCentre {
  id: string;
  mediationCentreId: string;
  name: string;
  iat: string;
  exp: number;
}
interface CtxAdmin {
  id: string;
  name: string;
  username: string;
  adminId: string;
  iat: string;
  exp: number;
}
interface CtxMediationAdmin {
  id: string;
  name: string;
  username: string;
  mediationAdminId: string;
  iat: string;
  exp: number;
}
interface CtxMediator {
  id: string;
  name: string;
  iat: string;
  exp: number;
  registrationId: string;
  mediationAdminId: string;
  mediationCentreId: string;
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

function getMediationCentreFromRequest(req: NextApiRequest) {
  const token = req.cookies.mediationCentreToken;

  if (token) {
    try {
      const verified = verifyJwt<CtxMediationCentre>(token);
      return verified;
    } catch (e) {
      return null;
    }
  }
}

function getMediatorFromRequest(req: NextApiRequest) {
  const token = req.cookies.mediatorToken;

  if (token) {
    try {
      const verified = verifyJwt<CtxMediator>(token);
      return verified;
    } catch (e) {
      return null;
    }
  }
}

function getMediationAdminFromRequest(req: NextApiRequest) {
  const token = req.cookies.mediationAdminToken;

  if (token) {
    try {
      const verified = verifyJwt<CtxMediationAdmin>(token);
      return verified;
    } catch (e) {
      return null;
    }
  }
}

function getMediationPartyFromRequest(req: NextApiRequest) {
  const token = req.cookies.mediationPartyToken;

  if (token) {
    try {
      const verified = verifyJwt<CtxMediationParty>(token);
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
  const mediationCentre = getMediationCentreFromRequest(req);
  const mediator = getMediatorFromRequest(req);
  const mediationAdmin = getMediationAdminFromRequest(req);
  const mediationParty = getMediationPartyFromRequest(req);

  return {
    req,
    res,
    prisma,
    arbitrator,
    client,
    arbitrationCentre,
    admin,
    mediationCentre,
    mediator,
    mediationParty,
    mediationAdmin,
  };
}

export type Context = ReturnType<typeof createContext>;
