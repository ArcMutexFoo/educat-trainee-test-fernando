import { useForm } from "react-hook-form";
import { updateTask, type Task } from "../fetch/Tasks";
import { useNavigate, useParams, useSearchParams } from "react-router";
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, FormControl, InputLabel, NativeSelect, TextField } from "@mui/material";
import { useState } from "react";

const updateProductFormSchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
    priority: z.string()
})

type UpdateProductFormSchema = z.infer<typeof updateProductFormSchema>



export default function UpdateOne() {

    
    const navigate = useNavigate()
    const {id} = useParams()
    const [searchParams] = useSearchParams()


    const name = searchParams.get("name") ?? ""
    const description = searchParams.get("description") ?? ""
    const priority = searchParams.get("priority") ?? ""
    const status = searchParams.get("status") ?? ""
    
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(updateProductFormSchema),
        defaultValues: {
            name: name,
            description: description,
            status: status,
            priority: priority,
        }
    })


    async function handleUpdateTask(data: UpdateProductFormSchema) {

        try {
            const parsedId = parseInt(id!)

            await updateTask(parsedId, {
                name: data.name,
                description: data.description,
                priority: data.priority,
                status: data.status,
            })

            navigate("/")
        } catch (error) {
            console.log("error updating task:", error)
            navigate("/")
        }

        
    }


    return (<>
        <form onSubmit={handleSubmit(handleUpdateTask)}>
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
                <Button type="submit">Atualizar</Button>
            </Box>
            

        </form>
    
    </>)
}