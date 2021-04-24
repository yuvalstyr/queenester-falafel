import { InferGetServerSidePropsType } from "next"
import { request, gql } from "graphql-request"
import { User, Query } from "../generates"
import { ShiftForm } from "../Components/ShiftForm"

const endpoint = process.env.GRAPHQL_URL
const query = gql`
  query user {
    allUsers {
      id
      name
      email
    }
  }
`

function Index({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <h1>Main</h1>
}
export default Index

export async function getServerSideProps() {
  const { allUsers }: { allUsers: User[] } = await request(endpoint, query)
  return { props: { user: allUsers[0] } }
}
