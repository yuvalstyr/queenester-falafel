const apiURL = "api"

type FetchClientProps = {
  endpoint: string
  data?: { [key: string]: any }
  method: "POST" | "DELETE" | "PUT" | "GET"
}

async function client({ data, endpoint, method }: FetchClientProps) {
  const config = {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
  }

  return window
    .fetch(`${apiURL}/${endpoint}`, method === "GET" ? undefined : config)
    .then(async (response) => {
      if (response.status === 401) {
        // refresh the page for them
        window.location.assign(window.location.toString())
        return Promise.reject({ message: "Please re-authenticate." })
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export { client }
