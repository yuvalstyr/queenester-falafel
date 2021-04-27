import { createSchema, list } from "@keystone-next/keystone/schema";
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  float,
} from "@keystone-next/fields";
import { document } from "@keystone-next/fields-document";

export const lists = createSchema({
  User: list({
    ui: {
      listView: {
        initialColumns: ["name"],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
      password: password(),
    },
  }),
  Employee: list({
    fields: {
      name: text({ isRequired: true }),
      salaryPerHour: float({ isRequired: true }),
      active: select({
        isRequired: true,
        options: [
          { label: "true", value: "true" },
          { label: "false", value: "false" },
        ],
        defaultValue: "true",
      }),
      shifts: relationship({ ref: "Shift.worker", many: true }),
    },
  }),
  Expense: list({
    fields: {
      date: timestamp({ isRequired: true }),
      name: text({ isRequired: true }),
      cost: float({ isRequired: true }),
    },
  }),
  Shift: list({
    fields: {
      start: timestamp({ isRequired: true }),
      end: timestamp({ isRequired: true }),
      worker: relationship({ ref: "Employee.shifts", many: false }),
    },
  }),
});
