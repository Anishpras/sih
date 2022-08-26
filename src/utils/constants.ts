import ArbitrationCentre from "./ArbitrationCentre.json";

export const arbitrationCentreAddress =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const arbitrationCentreABI = ArbitrationCentre.abi;

export const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000/";

export const url = `${baseUrl}/api/trpc`;
