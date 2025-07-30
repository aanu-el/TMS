import * as bcrypt from "bcryptjs";
import {v4 as uuidv4} from "uuid";
import {addMinutes} from "date-fns";

export const generateUUID = (): string => {
  return uuidv4();
};

export const generateVerificationCode = () => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const expiresIn = addMinutes(new Date(), 30);
  return {verificationCode, expiresIn};
};

export const generateHash = (param: string) => {
  return bcrypt.hash(param, 10);
};

export const compareHash = (param: string, compareParam: string) => {
  return bcrypt.compare(param, compareParam);
};
