import { Storage } from "@google-cloud/storage";

export function getBucket() {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not defined");
  }

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
  });

  return storage.bucket("khs-zlin");
}
