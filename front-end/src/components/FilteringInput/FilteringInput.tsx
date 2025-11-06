import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, FormControl, InputLabel, NativeSelect, TextField } from "@mui/material"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router"
import z from "zod"

const filterTaskSchema = z.object({
    search: z.string(),
    orderBy: z.string(),
    direction: z.string(),
    limit: z.number(),
})

type FilterTaskSchema = z.infer<typeof filterTaskSchema>


export default function FilteringInput() {

    const [searchParams, setSearchParams] = useSearchParams()

    // const [search, setSearch] = useState(searchParams.get("search") ?? "")
    // const [orderBy, setOrderBy] = useState(searchParams.get("orderBy") ?? "")
    // const [direction, setDirection] = useState(searchParams.get("direction") ?? "")
    // const [limit, setLimit] = useState(searchParams.get("limit") ?? "")

    const search = searchParams.get("search") ?? ""
    const orderBy = searchParams.get("orderBy") ?? ""
    const direction = searchParams.get("direction") ?? ""
    const limit = searchParams.get("limit") ?? ""

    const { register, watch} = useForm({
        resolver: zodResolver(filterTaskSchema),
        defaultValues: {
            search: search,
            orderBy: orderBy,
            direction: direction,
            limit: parseInt(limit)
        }
    })


    let formValues = watch()

    // useEffect(() => {
    //     const params = new URLSearchParams()
        
    //     if (formValues.search) params.set("search", formValues.search)
    //     if (formValues.orderBy) params.set("orderBy", formValues.orderBy)
    //     if (formValues.direction) params.set("direction", formValues.direction)
    //     if (formValues.limit) params.set("limit", formValues.limit.toString())

    //     setSearchParams(params, { replace: true })
    // }, [formValues, setSearchParams])

    // function handleFilter(data: FilterTaskSchema) {
    //     setSearchParams({search: data.search})
    //     setSearchParams({orderBy: data.orderBy})
    //     setSearchParams({direction: data.direction})
    //     setSearchParams({limit: `${data.limit}`})

    //     console.log("submit filtering works")
    // }



    return <form>
        <Box sx={{
            py: 2
        }}>
            <TextField
                label="filtro"
                placeholder="digite como deseja filtrar"
                {...register("search")}
            />

        </Box>
        
        <FormControl sx={{
                mx: 2,
                my: 2
        }}>
            <InputLabel variant="standard" htmlFor="orderBy-select">
                Ordem
            </InputLabel>
            <NativeSelect
                defaultValue={"name"}
                inputProps={{
                    name: "orderBy",
                    id: "orderBy-select",
                }}
                {...register("orderBy")}
            >
                <option value={"id"}>Id</option>
                <option value={"name"}>Nome</option>
                <option value={"description"}>Descricao</option>
                <option value={"status"}>Status</option>
                <option value={"priority"}>Prioridade</option>

            </NativeSelect>

        </FormControl>

        <FormControl sx={{
                mx: 2,
                my: 2
        }}>
            <InputLabel variant="standard" htmlFor="direction-select">
                Direcao
            </InputLabel>
            <NativeSelect
                defaultValue={"asc"}
                inputProps={{
                    name: "direction",
                    id: "direction-select",
                }}
                {...register("direction")}
            >
                <option value={"asc"}>Ascendente</option>
                <option value={"desc"}>Descendente</option>

            </NativeSelect>

        </FormControl>

        <FormControl sx={{
                mx: 2,
                my: 2
        }}>
            <InputLabel variant="standard" htmlFor="limit-select">
                Limite
            </InputLabel>
            <NativeSelect
                defaultValue={"10"}
                inputProps={{
                    name: "limit",
                    id: "limit-select",
                }}
                {...register("direction")}
            >
                <option value={"5"}>&nbsp;5&nbsp;</option>
                <option value={"10"}>10</option>
                <option value={"15"}>15</option>

            </NativeSelect>



        </FormControl>

        <Box>
            <Button type="submit">Filtrar</Button>
        </Box>


    </form>
}