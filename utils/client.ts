import { useQueryClient, QueryClient } from "react-query";

const apiURL =
  process.env.NODE_ENV === "production"
    ? null
    : process.env.NEXT_PUBLIC_REACT_APP_API_URL;

type FetchClientProps = {
  endpoint: string;
  data?: { [key: string]: any };
  method: "POST" | "DELETE" | "PUT" | "GET";
};

async function client({ data, endpoint, method }: FetchClientProps) {
  const config = {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return window
    .fetch(`${endpoint}`, method === "GET" ? null : config)
    .then(async (response) => {
      if (response.status === 401) {
        // refresh the page for them
        window.location.assign(window.location.toString());
        return Promise.reject({ message: "Please re-authenticate." });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
