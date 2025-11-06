import { Box, Button, FormControl, InputLabel, NativeSelect, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from "react-router"
import { createOneTask } from "../../fetch/Tasks"


const addProductFormSchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
    priority: z.string()
})

type AddProductFormSchema = z.infer<typeof addProductFormSchema>

export default function CreateOneTask(){

    const { register, handleSubmit } = useForm<AddProductFormSchema>({
        resolver: zodResolver(addProductFormSchema)
    })
    const navigate = useNavigate()

    async function handleCreateTask(data: AddProductFormSchema) {
        const task = {
            name: data.name,
            description: data.description,
            status: data.status,
            priority: data.priority
        }
        await createOneTask(task)

        navigate("/")

    }

    return (<>
        <h1>Create a task</h1>

        <form onSubmit={handleSubmit(handleCreateTask)}>
            <TextField
                label="Nome da task"
                placeholder="digite o nome da task..."
                {...register("name")}
                sx={{
                    mx: 2,
                    my: 2
                }}
            />

            <TextField
                label="Descricao da task"
                placeholder="digite a descricao da task..."
                {...register("description")}
                sx={{
                    mx: 2,
                    my: 2
                }}
            />

            <FormControl sx={{
                mx: 2,
                my: 2
            }}>
                <InputLabel variant="standard" htmlFor="status-select">
                    Status da task
                </InputLabel>
                <NativeSelect
                    defaultValue={"in_progress"}
                    inputProps={{
                        name: "status",
                        id: "status-select",
                    }}
                    {...register("status")}
                >
                    <option value={"todo"}>To Do</option>
                    <option value={"in_progress"}>Em progresso</option>
                    <option value={"done"}>Done</option>

                </NativeSelect>

            </FormControl>

            <FormControl
                sx={{
                    mx: 2,
                    my: 2
                }}
            >

                <InputLabel variant="standard" htmlFor="priority-select">
                    Prioridade da task
                </InputLabel>
                <NativeSelect
                    defaultValue={"medium"}
                    inputProps={{
                        name: "priority",
                        id: "priority-select"
                    }}
                    {...register("priority")}
                >
                    <option value={"low"}>Pequena</option>
                    <option value={"medium"}>Media</option>
                    <option value={"high"}>Alta</option>
                </NativeSelect>

            </FormControl>

            <Box>

                <Button type="submit">Criar</Button>
            </Box>
            

        </form>
    </>)
}