import { config } from "@keystone-next/keystone/schema";
import {
  statelessSessions,
  withItemData,
} from "@keystone-next/keystone/session";
import { createAuth } from "@keystone-next/auth";

import { lists } from "./schema";

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "The SESSION_SECRET environment variable must be set in production"
    );
  } else {
    sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
  }
}

let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const auth = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

export default auth.withAuth(
  config({
    server: {
      port: 5000,
      cors: {
        origin: ["http://localhost:3000"],
        credentials: true,
      },
    },
    db: {
      adapter: "prisma_postgresql",
      url:
        process.env.DATABASE_URL ||
        "postgres://hrvensbygdfmsh:b5918d510bed88616cd6a0c918db51b391d52f9ae54b486ed9b38fc373e40f13@ec2-52-50-171-4.eu-west-1.compute.amazonaws.com:5432/d9ffdi4sphuce4",
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session: withItemData(
      statelessSessions({
        maxAge: sessionMaxAge,
        secret: sessionSecret,
      }),
      { User: "name" }
    ),
  })
);
