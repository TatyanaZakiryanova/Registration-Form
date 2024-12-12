import { Dayjs } from "dayjs";

export interface FormData {
  username: string;
  email: string;
  phone: string;
  dob: Dayjs | null;
  password: string;
  confirmPassword: string;
  terms: boolean;
}
