import { Employee, Shift } from ".prisma/client";
import { format } from "date-fns";
import { ClientError } from "graphql-request";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { client } from "./client";

export type ShiftWithWorker = Shift & { Employee: Employee };

export type DayBoundary = {
  startDay: string;
};

function getDefaultMutationOptions() {
  return {
    onError: (_err: never, _variables: never, recover: any) => {
      console.log("error");
      return typeof recover === "function" ? recover() : null;
    },
  };
}

function useShifts({ startDay }: { startDay: string }) {
  const results = useQuery<ShiftWithWorker[], ClientError>({
    queryKey: ["shifts", startDay],
    queryFn: () => client({ endpoint: `shifts\\${startDay}`, method: "GET" }),
  });
  return { ...results };
}

function useCreateShifts() {
  const queryClient = useQueryClient();
  // default mutation behaviors
  const defaultMutationOptions = getDefaultMutationOptions();
  return useMutation(
    (data: Omit<Shift, "id" | "optimistic">) => {
      return client({ data, endpoint: "shifts", method: "POST" });
    },
    {
      onMutate(newItem: Shift) {
        const employees = queryClient.getQueryData<Employee[]>("employees");
        const employee = employees.filter((e) => e.id === newItem.worker)[0];
        const { startDate, endTime, endDate, startTime } = newItem;
        console.log(`newItem`, newItem);
        const newShift: ShiftWithWorker = {
          id: uuidv4(),
          startDate,
          startTime,
          endDate,
          endTime,
          worker: employee.id,
          Employee: employee,
          optimistic: true,
        };
        // for roll back if the mutation will return error
        const previousShifts = queryClient.getQueryData<Shift[]>([
          "shifts",
          startDate,
        ]);

        // Optimistically update to the new value
        if (previousShifts) {
          queryClient.setQueryData<Shift[]>(["shifts", startDate], (old) => [
            ...old,
            newShift,
          ]);
        }

        return () =>
          queryClient.setQueryData(["shifts", startDate], previousShifts);
      },
      onSettled: (shift) => {
        return queryClient.invalidateQueries(["shifts", shift.startDate]);
      },
      ...defaultMutationOptions,
    }
  );
}

function useDeleteShift() {
  const queryClient = useQueryClient();
  const defaultMutationOptions = getDefaultMutationOptions();
  return useMutation(
    ({ id }: { id: string; start: string }) =>
      client({ endpoint: `shifts\\${id}`, method: "DELETE" }),
    {
      onMutate(removedItem: { id: string; start: string }) {
        const day = format(new Date(removedItem.start), "yyyy-MM-dd");
        // for roll back if the mutation will return error
        const previousShifts = queryClient.getQueryData<Shift[]>([
          "shifts",
          day,
        ]);

        queryClient.setQueryData<Shift[]>(["shifts", day], (old) => {
          // filtered deleted item from cache
          return old.filter((s) => s.id !== removedItem.id);
        });
        return () => queryClient.setQueryData(["shifts", day], previousShifts);
      },
      onSettled: (deleteShift: Shift) => {
        return queryClient.invalidateQueries(["shifts", deleteShift.startDate]);
      },
      ...defaultMutationOptions,
    }
  );
}

export { useCreateShifts, useShifts, useDeleteShift };
