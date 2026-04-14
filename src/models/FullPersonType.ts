import type { Person } from "@models";

export type FullPerson = Person & {
  email: string;
  phone: string;
  age: number;
  country: string;
};
