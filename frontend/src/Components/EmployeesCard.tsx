import * as React from "react";
import { Box, Container } from "@chakra-ui/layout";
import { EmployeeList } from "./EmployeeList";
import { FormCard } from "./FormCard";
import { useAsync } from "../utils/useAsync";
import request, { gql } from "graphql-request";
import getConfig from "next/config";
import { ErrorBox } from "./ErrorBox";
import { Spinner } from "@chakra-ui/spinner";
import { EmployeesShiftForm } from "./EmployeesShiftForm";

export type EmployeeFormInputs = {
  name: HTMLInputElement;
  start: HTMLInputElement;
  end: HTMLInputElement;
};

export interface EmployeeFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

type FormElements = EmployeeFormInputs & HTMLFormControlsCollection;

const query = gql`
  query ActiveEmployees {
    allEmployees {
      id
      name
    }
  }
`;

export async function getActiveEmployee() {
  const { publicRuntimeConfig } = getConfig();
  if (!publicRuntimeConfig.GRAPHQL_URL) return;
  return await request(publicRuntimeConfig.GRAPHQL_URL, query);
}

export function EmployeesCard({ employees }): JSX.Element {
  return (
    <FormCard title={"Employees"}>
      <EmployeesShiftForm employees={employees} />
      <EmployeeList />
    </FormCard>
  );
}
