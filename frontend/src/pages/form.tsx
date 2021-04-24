import { Spinner } from "@chakra-ui/spinner"
import { ErrorBox } from "../Components/ErrorBox"
import { ShiftForm } from "../Components/ShiftForm"
import { useActiveEmployees } from "../utils/employees"

// type serverSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

function Form() {
  const {
    data: { allEmployees: employees },
    isLoading,
    isIdle,
    isError,
    error,
  } = useActiveEmployees()

  if (isIdle) return null
  if (isLoading) return <Spinner />
  if (isError) {
    return <ErrorBox error={error} />
  }

  return <ShiftForm data={{ employees }} />
}

export default Form
