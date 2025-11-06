import { Stack, Pagination } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { useSearchParams } from "react-router";

export default function TaskPagination({totalPages}: {totalPages: number | undefined}) {

    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState<string>(searchParams.get("") ?? "1")


    function refetchTasks(_: ChangeEvent<unknown>, page: number) {
        setPage(`${page}`)
        setSearchParams({page: `${page}`})

    }


    return <>


        <Stack
            spacing={2}
            sx={{
                alignItems: "center"
            }}
        >
            <Pagination
                count={totalPages ?? 1}
                page={parseInt(page)}
                shape="rounded"
                onChange={refetchTasks}
            />
        </Stack>
    </>
}