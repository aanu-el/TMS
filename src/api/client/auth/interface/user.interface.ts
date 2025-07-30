import {Status} from "@prisma/client";

export interface User {
  userUuid: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string | null;
  status: Status;
  verificationCode: number | null;
  expiresIn: Date | null;
  verificationDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaveUserData {
  userUuid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: Status;
  verificationCode?: number;
  expiresIn?: Date;
}
