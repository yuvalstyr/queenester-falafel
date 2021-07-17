import { Employee, InvestmentType } from "@prisma/client"

//  for instance use, isOfType<Image>(file, "height")
export const isOfType = <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined

type EmployeeORInvestment<T extends Employee[] | InvestmentType[]> =
  T extends Employee[] ? Employee[] : InvestmentType[]
export function createTypedArray<T extends Employee[] | InvestmentType[]>(
  array: T
): EmployeeORInvestment<T> {
  throw "unimplemented"
}
