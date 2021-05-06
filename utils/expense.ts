import { Expense } from ".prisma/client";
import { format, startOfDay } from "date-fns";
import { ClientError } from "graphql-request";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { client } from "./client";
import { DayBoundary } from "./shifts";

function getDefaultMutationOptions() {
  return {
    onError: (_err, _variables, recover) =>
      typeof recover === "function" ? recover() : null,
  };
}

function useExpense({ endDay, startDay }: DayBoundary) {
  const day = format(startOfDay(new Date(startDay)), "yyyy-MM-dd");
  const result = useQuery<Expense[], ClientError>({
    queryKey: ["expense", { day }],
    queryFn: () => client({ endpoint: `expense\\${day}`, method: "GET" }),
  });

  return { ...result };
}

function useCreateExpense() {
  const queryClient = useQueryClient();
  // default mutation behaviors
  const defaultMutationOptions = getDefaultMutationOptions();

  return useMutation(
    (data: Expense) => {
      return client({ data, endpoint: "expense", method: "POST" });
    },
    {
      onMutate(newItem: Expense) {
        const day = format(new Date(newItem.date), "yyyy-MM-dd");

        // for roll back if the mutation will return error
        const previousExpense = queryClient.getQueryData<Expense[]>([
          "expense",
          { day },
        ]);
        // Optimistically update to the new value
        if (previousExpense) {
          queryClient.setQueryData<Expense[]>(["expense", { day }], (old) => {
            return [...old, { ...newItem, id: uuidv4(), optimistic: true }];
          });
        } else {
          queryClient.setQueryData<Expense[]>(["expense", { day }], [newItem]);
        }
        return () => queryClient.setQueryData("expense", previousExpense);
      },
      onSettled: (expense) => {
        const day = format(new Date(expense.date), "yyyy-MM-dd");
        return queryClient.invalidateQueries(["expense", { day }]);
      },
      ...defaultMutationOptions,
    }
  );
}
function useDeleteExpense() {
  const queryClient = useQueryClient();
  const defaultMutationOptions = getDefaultMutationOptions();
  return useMutation(
    ({ id: expenseId }) =>
      client({ endpoint: `expense\\${expenseId}`, method: "DELETE" }),
    {
      onMutate(removedItem: { id: string; date: Date }) {
        const day = format(new Date(removedItem.date), "yyyy-MM-dd");
        const previousExpanse = queryClient.getQueryData<Expense[]>([
          "expense",
          { day },
        ]);
        queryClient.setQueryData<Expense[]>(["expense", { day }], (old) => {
          const newData = old.filter((s) => s.id !== removedItem.id);
          return newData;
        });
        return () =>
          queryClient.setQueryData(["expense", { day }], previousExpanse);
      },
      ...defaultMutationOptions,
    }
  );
}

export { useCreateExpense, useExpense, useDeleteExpense };
