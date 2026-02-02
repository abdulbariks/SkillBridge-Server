var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express3 from "express";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.2.0",
  "engineVersion": "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3",
  "activeProvider": "postgresql",
  "inlineSchema": 'enum UserRole {\n  STUDENT\n  TUTOR\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  INACTIVE\n  BANNED\n}\n\nmodel User {\n  id            String  @id @default(cuid())\n  name          String\n  email         String  @unique\n  emailVerified Boolean @default(false)\n  image         String?\n  phone         String?\n\n  role   UserRole?   @default(STUDENT)\n  status UserStatus? @default(ACTIVE)\n\n  // Better Auth relations\n  sessions Session[]\n  accounts Account[]\n\n  // App-specific relations\n  tutorProfile TutorProfile?\n  bookings     Booking[]     @relation("StudentBookings")\n  reviews      Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id @default(cuid())\n  expiresAt DateTime\n  token     String   @unique\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id @default(cuid())\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id @default(cuid())\n  identifier String\n  value      String\n  expiresAt  DateTime\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum BookingStatus {\n  PENDING\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n\nmodel Booking {\n  id        String @id @default(uuid())\n  studentId String\n  tutorId   String\n\n  startTime DateTime\n  endTime   DateTime\n  status    BookingStatus @default(PENDING)\n\n  student User         @relation("StudentBookings", fields: [studentId], references: [id])\n  tutor   TutorProfile @relation("TutorBookings", fields: [tutorId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Category {\n  id     String         @id @default(uuid())\n  name   String         @unique\n  tutors TutorProfile[] @relation("TutorCategories")\n\n  createdAt DateTime @default(now())\n}\n\nmodel Review {\n  id      String  @id @default(uuid())\n  rating  Int // 1\u20135\n  comment String?\n\n  studentId String\n  tutorId   String\n\n  student User         @relation(fields: [studentId], references: [id])\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id])\n\n  createdAt DateTime @default(now())\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel TutorProfile {\n  id         String  @id @default(uuid())\n  userId     String  @unique\n  bio        String?\n  hourlyRate Float\n  experience Int\n  available  Boolean @default(true)\n  isVerified Boolean @default(false)\n\n  user       User       @relation(fields: [userId], references: [id])\n  categories Category[] @relation("TutorCategories")\n  bookings   Booking[]  @relation("TutorBookings")\n  reviews    Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"StudentBookings"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"student","kind":"object","type":"User","relationName":"StudentBookings"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"TutorBookings"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"tutors","kind":"object","type":"TutorProfile","relationName":"TutorCategories"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"hourlyRate","kind":"scalar","type":"Float"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"available","kind":"scalar","type":"Boolean"},{"name":"isVerified","kind":"scalar","type":"Boolean"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"categories","kind":"object","type":"Category","relationName":"TutorCategories"},{"name":"bookings","kind":"object","type":"Booking","relationName":"TutorBookings"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  }
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  BookingScalarFieldEnum: () => BookingScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  TutorProfileScalarFieldEnum: () => TutorProfileScalarFieldEnum,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.2.0",
  engine: "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Booking: "Booking",
  Category: "Category",
  Review: "Review",
  TutorProfile: "TutorProfile"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  phone: "phone",
  role: "role",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var BookingScalarFieldEnum = {
  id: "id",
  studentId: "studentId",
  tutorId: "tutorId",
  startTime: "startTime",
  endTime: "endTime",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  createdAt: "createdAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  studentId: "studentId",
  tutorId: "tutorId",
  createdAt: "createdAt"
};
var TutorProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  bio: "bio",
  hourlyRate: "hourlyRate",
  experience: "experience",
  available: "available",
  isVerified: "isVerified",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "STUDENT",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    callbackURL: process.env.FRONTEND_APP_URL
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Prisma Blog" <prismablog@ph.com>',
          to: user.email,
          subject: "Please verify your email!",
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .header {
      background-color: #0f172a;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 22px;
    }

    .content {
      padding: 30px;
      color: #334155;
      line-height: 1.6;
    }

    .content h2 {
      margin-top: 0;
      font-size: 20px;
      color: #0f172a;
    }

    .button-wrapper {
      text-align: center;
      margin: 30px 0;
    }

    .verify-button {
      background-color: #2563eb;
      color: #ffffff !important;
      padding: 14px 28px;
      text-decoration: none;
      font-weight: bold;
      border-radius: 6px;
      display: inline-block;
    }

    .verify-button:hover {
      background-color: #1d4ed8;
    }

    .footer {
      background-color: #f1f5f9;
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #64748b;
    }

    .link {
      word-break: break-all;
      font-size: 13px;
      color: #2563eb;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Prisma Blog</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Verify Your Email Address</h2>
      <p>
        Hello ${user.name} <br /><br />
        Thank you for registering on <strong>Prisma Blog</strong>.
        Please confirm your email address to activate your account.
      </p>

      <div class="button-wrapper">
        <a href="${verificationUrl}" class="verify-button">
          Verify Email
        </a>
      </div>

      <p>
        If the button doesn\u2019t work, copy and paste the link below into your browser:
      </p>

      <p class="link">
        ${url}
      </p>

      <p>
        This verification link will expire soon for security reasons.
        If you did not create an account, you can safely ignore this email.
      </p>

      <p>
        Regards, <br />
        <strong>Prisma Blog Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      \xA9 2025 Prisma Blog. All rights reserved.
    </div>
  </div>
</body>
</html>
`
        });
        console.log("Message sent:", info.messageId);
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/app.ts
import cors from "cors";

// src/middlewares/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorCode;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid or missing fields in request";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    errorCode = err.code;
    switch (err.code) {
      case "P2002":
        statusCode = 400;
        message = "Duplicate value. This record already exists.";
        break;
      case "P2003":
        statusCode = 400;
        message = "Foreign key constraint failed";
        break;
      case "P2025":
        statusCode = 404;
        message = "Requested record not found";
        break;
      default:
        message = "Database request error";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = "Unknown database error occurred";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    statusCode = 500;
    message = "Failed to connect to database";
  } else if (err instanceof Error) {
    message = err.message;
    statusCode = 400;
  }
  res.status(statusCode).json({
    success: false,
    message,
    error: {
      code: errorCode,
      ...process.env.NODE_ENV === "development" && {
        stack: err.stack
      }
    }
  });
}
var globalErrorHandler_default = errorHandler;

// src/middlewares/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found!",
    path: req.originalUrl,
    date: Date()
  });
}

// src/modules/booking/booking.router.ts
import express from "express";

// src/middlewares/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
var auth_default = auth2;

// src/modules/booking/booking.service.ts
var createBooking = async (payload) => {
  const { studentId, tutorId, startTime, endTime } = payload;
  if (startTime >= endTime) {
    throw new Error("Start time must be before end time");
  }
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: tutorId }
  });
  if (!tutor) {
    throw new Error("Tutor not found");
  }
  const booking = await prisma.booking.create({
    data: {
      studentId,
      tutorId,
      startTime,
      endTime,
      status: "PENDING"
    }
  });
  return booking;
};
var getBookings = async (user) => {
  const { id, role } = user;
  if (role === "ADMIN" /* ADMIN */) {
    return prisma.booking.findMany({
      include: {
        student: true,
        tutor: {
          include: { user: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
  }
  if (role === "STUDENT" /* STUDENT */) {
    return prisma.booking.findMany({
      where: {
        studentId: id
      },
      include: {
        tutor: {
          include: { user: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
  }
  if (role === "TUTOR" /* TUTOR */) {
    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: { userId: id }
    });
    if (!tutorProfile) {
      throw new Error("Tutor profile not found");
    }
    return prisma.booking.findMany({
      where: {
        tutorId: tutorProfile.id
      },
      include: {
        student: true
      },
      orderBy: { createdAt: "desc" }
    });
  }
  throw new Error("Invalid role");
};
var BookingService = {
  createBooking,
  getBookings
};

// src/modules/booking/booking.controller.ts
var createBooking2 = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found"
      });
    }
    const studentId = req.user.id;
    const { tutorId, startTime, endTime } = req.body;
    const booking = await BookingService.createBooking({
      studentId,
      tutorId,
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    });
    res.status(201).json({
      success: true,
      message: "Booking request created successfully",
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getBookings2 = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await BookingService.getBookings(req.user);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var BookingController = {
  createBooking: createBooking2,
  getBookings: getBookings2
};

// src/modules/booking/booking.router.ts
var router = express.Router();
router.post("/", auth_default("STUDENT" /* STUDENT */), BookingController.createBooking);
router.get("/", auth_default("STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */, "ADMIN" /* ADMIN */), BookingController.getBookings);
var bookingRouter = router;

// src/modules/users/user.router.ts
import express2 from "express";

// src/modules/users/user.service.ts
var getAllUsers = async ({}) => {
  const allUsers = await prisma.user.findMany({});
  return {
    data: allUsers
  };
};
var UsersService = {
  getAllUsers
};

// src/modules/users/user.controller.ts
var getAllUsers2 = async (req, res) => {
  try {
    const result = await UsersService.getAllUsers({});
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Booking creation failed",
      details: e
    });
  }
};
var UsersController = {
  getAllUsers: getAllUsers2
};

// src/modules/users/user.router.ts
var router2 = express2.Router();
router2.get(
  "/",
  UsersController.getAllUsers
);
var usersRouter = router2;

// src/modules/tutor/tutor.router.ts
import { Router as Router3 } from "express";

// src/modules/tutor/tutor.service.ts
var createTutorProfile = async (userId, data, categories) => {
  const { bio, hourlyRate, available, experience } = data;
  const existing = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (existing) {
    throw new Error("Tutor profile already exists");
  }
  const profile = await prisma.tutorProfile.create({
    data: {
      userId,
      bio: bio ?? null,
      hourlyRate,
      available,
      experience,
      categories: {
        connect: categories.map((id) => ({ id }))
      }
    },
    include: {
      user: true,
      categories: true
    }
  });
  return profile;
};
var getAllTutors = async () => {
  const tutors = await prisma.tutorProfile.findMany({
    include: {
      user: true,
      categories: true,
      reviews: true
    }
  });
  return tutors;
};
var getTutorDetailById = async (tutorId) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: tutorId },
    include: {
      user: true,
      categories: true,
      reviews: true,
      bookings: true
    }
  });
  return tutor;
};
var updateTutorProfile = async (userId, data) => {
  const { bio, hourlyRate, experience, isVerified, categories } = data;
  const existingProfile = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (!existingProfile) {
    throw new Error("Tutor profile not found");
  }
  const updatedProfile = await prisma.tutorProfile.update({
    where: { userId },
    data: {
      bio,
      hourlyRate,
      experience,
      isVerified,
      ...categories && {
        categories: {
          set: categories.map((id) => ({ id }))
        }
      }
    },
    include: {
      user: true,
      categories: true
    }
  });
  return updatedProfile;
};
var TutorService = {
  createTutorProfile,
  getAllTutors,
  getTutorDetailById,
  updateTutorProfile
};

// src/modules/tutor/tutor.controller.ts
var createTutorProfile2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
    const { bio, hourlyRate, experience, available, categories } = req.body;
    const result = await TutorService.createTutorProfile(
      user.id,
      { bio, hourlyRate, available, experience },
      categories
    );
    res.status(201).json({
      success: true,
      message: "Tutor profile created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateTutorProfile2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const profile = await TutorService.updateTutorProfile(
      user.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Tutor profile updated successfully",
      data: profile
    });
  } catch (error) {
    next(error);
  }
};
var getAllTutors2 = async (req, res, next) => {
  try {
    const tutors = await TutorService.getAllTutors();
    res.status(200).json({
      success: true,
      data: tutors
    });
  } catch (error) {
    next(error);
  }
};
var getTutorDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Tutor ID is required"
      });
    }
    const tutor = await TutorService.getTutorDetailById(id);
    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found"
      });
    }
    res.status(200).json({
      success: true,
      data: tutor
    });
  } catch (error) {
    next(error);
  }
};
var TutorController = {
  createTutorProfile: createTutorProfile2,
  getAllTutors: getAllTutors2,
  getTutorDetail,
  updateTutorProfile: updateTutorProfile2
};

// src/modules/tutor/tutor.router.ts
var router3 = Router3();
router3.get("/", TutorController.getAllTutors);
router3.get("/:id", TutorController.getTutorDetail);
router3.post(
  "/",
  auth_default("STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */),
  TutorController.createTutorProfile
);
var tutorRouter = router3;

// src/modules/categories/category.router.ts
import { Router as Router4 } from "express";

// src/modules/categories/category.service.ts
var createCategory = async (name) => {
  const existingCategory = await prisma.category.findUnique({
    where: { name }
  });
  if (existingCategory) {
    throw new Error("Category already exists");
  }
  const category = await prisma.category.create({
    data: { name }
  });
  return category;
};
var getCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};
var CategoryService = {
  createCategory,
  getCategories
};

// src/modules/categories/category.controller.ts
var createCategory2 = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log("====================================");
    console.log(name);
    console.log("====================================");
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }
    const result = await CategoryService.createCategory(name);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getCategories2 = async (req, res, next) => {
  try {
    const result = await CategoryService.getCategories();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var CategoryController = {
  createCategory: createCategory2,
  getCategories: getCategories2
};

// src/modules/categories/category.router.ts
var router4 = Router4();
router4.get("/", CategoryController.getCategories);
router4.post("/", auth_default("ADMIN" /* ADMIN */), CategoryController.createCategory);
var categoryRouter = router4;

// src/modules/reviews/reviews.router.ts
import { Router as Router5 } from "express";

// src/modules/reviews/reviews.service.ts
var createReview = async (payload) => {
  if (payload.rating < 1 || payload.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  return prisma.review.create({
    data: payload
  });
};
var getReviewsByTutor = async (tutorId) => {
  return prisma.review.findMany({
    where: { tutorId },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var ReviewService = {
  createReview,
  getReviewsByTutor
};

// src/modules/reviews/reviews.controller.ts
var createReview2 = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "STUDENT") {
      return res.status(403).json({
        success: false,
        message: "Only students can submit reviews"
      });
    }
    const { rating, comment, tutorId } = req.body;
    const review = await ReviewService.createReview({
      rating,
      comment,
      tutorId,
      studentId: user.id
    });
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create review"
    });
  }
};
var getReviewsByTutor2 = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const reviews = await ReviewService.getReviewsByTutor(tutorId);
    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews"
    });
  }
};
var ReviewController = {
  createReview: createReview2,
  getReviewsByTutor: getReviewsByTutor2
};

// src/modules/reviews/reviews.router.ts
var router5 = Router5();
router5.post("/", auth_default("STUDENT" /* STUDENT */), ReviewController.createReview);
router5.get("/tutor/:tutorId", ReviewController.getReviewsByTutor);
var ReviewRouter = router5;

// src/app.ts
var app = express3();
app.use(
  cors({
    origin: process.env.FRONTEND_APP_URL || "http://localhost:3001",
    // client side url
    credentials: true
  })
);
app.use(express3.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/v1/api/bookings", bookingRouter);
app.use("/v1/api/users", usersRouter);
app.use("/v1/api/tutors", tutorRouter);
app.use("/v1/api/categories", categoryRouter);
app.use("/v1/api/reviews", ReviewRouter);
app.get("/", (req, res) => {
  res.send("Skill Bridge!");
});
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    app_default.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
