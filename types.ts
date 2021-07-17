import { Employee, InvestmentType } from "@prisma/client"

export type AutocompleteTypes = Employee[] | InvestmentType[]

export function autocompleteIdentity<T>(arg: T[]): T[] {
  return arg
}
