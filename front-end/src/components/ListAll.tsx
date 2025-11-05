import { useCallback, useEffect, useState } from "react"
import { createOneTask, deleteTask, getManyTasks, type Task } from "../fetch/Tasks"
import { Box, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { NavLink, useNavigate } from "react-router"
import "./ListAll.css"

export default function ListAllTasks() {
  const [tasks, setTasks] = useState<Task[]>()
  const navigate = useNavigate()


  const loadTasks = useCallback(async () => {
    const data = await getManyTasks()
    setTasks(data)
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])


  async function handleDelete(id: number) {
    await deleteTask(id)
    await loadTasks()
  }

  async function handleCreate(input: Omit<Task, "id">) {
    await createOneTask(input)
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
            {tasks?.map((t, idx) => (
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
    </>
  )
}

