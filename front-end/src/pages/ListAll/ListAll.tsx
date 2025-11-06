import { useCallback, useEffect, useState } from "react"
import { deleteTask, getManyTasks, type TaskRequest } from "../../fetch/Tasks"
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { NavLink, useNavigate, useSearchParams } from "react-router"
import "./ListAll.css"
import TaskPagination from "../../components/Pagination/Pagination"
import FilteringInput from "../../components/FilteringInput/FilteringInput"

export default function ListAllTasks() {
  const [tasks, setTasks] = useState<TaskRequest | null>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()


  const loadTasks = useCallback(async () => {
    const search = searchParams.get("search") ?? ""
    const page = searchParams.get("page") ?? "1"
    const orderBy = searchParams.get("orderBy") ?? "id"
    const direction = searchParams.get("direction") ?? "asc"
    const limit = searchParams.get("limit") ?? "10"


    const data = await getManyTasks(search, page, direction, orderBy, parseInt(limit))
    setTasks(data)
  }, [searchParams])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])


  async function handleDelete(id: number) {
    await deleteTask(id)
    await loadTasks()
  }


  return (
    <>
      <Box>
        <Typography sx={{
          color: "slategrey"

        }} variant='h2'>Task management service</Typography>
      </Box>

      <Button sx={{
        bgcolor: "blue",
      }}
      >
        <NavLink to={"/create"}
        className={"whiteText"}>Criar nova task</NavLink>
      </Button>
      <FilteringInput />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descricao</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Prioridade</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.result.map((t, idx) => (
              <TableRow>
                <TableCell key={idx}>{t.name}</TableCell>
                <TableCell key={idx}>{t.description}</TableCell>
                <TableCell key={idx}>{t.status}</TableCell>
                <TableCell key={idx}>{t.priority}</TableCell>
                <TableCell>
                  <Button onClick={() => {
                    navigate({
                      pathname: `/update/${t.id}`,
                      search: `?name=${t.name}&description=${t.description}&status=${t.status}&priority=${t.priority}`
                    })
                  }}>Atualizar</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => {
                    handleDelete(t.id)
                  }}>Apagar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TaskPagination totalPages={tasks?.total_pages}/>
    </>
  )
}
