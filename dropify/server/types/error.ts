import { ErrorReasons } from "../enum/ErrorReasons";

export interface ErrorDetails {
  reason: ErrorReasons;
  message: string;
  data: any;
  location: string;
}

export interface WSSError {
  error: string;
  reasons: ErrorDetails[];
}

