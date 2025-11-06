export type TaskRequest = {
    page: number,
    limit: number,
    total_pages: number,
    total_items: number,
    result: Task[]
}

export type Task = {
    id: number,
    name: string,
    description: string,
    status: string,
    priority: string
}


export async function getManyTasks(search: string, page: string, direction: string, orderBy: string, limit: number): Promise<TaskRequest | null> {
    try {
        // const response = await axios.get<Task[]>("http://localhost:8000/tasks", {
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })

        const options = {
            // method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }

        const url = `http://localhost:8000/tasks?search=${search}&page=${page}&direction=${direction}&orderBy=${orderBy}&limit=${limit}`

        const res = await fetch(url, options)
        // return response.data

        console.log(res)

        if (!res.ok) {
            console.log("Error while fetching data res not ok:", res.statusText)
        }

        const data: TaskRequest = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log("Unexpected error", error)
        return null
    }
}

export async function getOneTask(id: number): Promise<Task | null> {
    try {
        const response = await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch task ${id}: ${response.statusText}`);
            return null;
        }

        const data: Task = await response.json();
        return data;
    } catch (error) {
        console.error("Unexpected error while fetching task:", error);
        return null;
    }
}

export async function createOneTask(task: Omit<Task, "id">): Promise<Task | null> {
    try {
        const response = await fetch("http://localhost:8000/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            console.error("Failed to create task:", response.statusText);
            return null;
        }

        const data: Task = await response.json();
        return data;
    } catch (error) {
        console.error("Unexpected error while creating task:", error);
        return null;
    }
}

export async function updateTask(id: number, updatedFields: Partial<Task>): Promise<Task | null> {
    try {
        const response = await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        });

        if (!response.ok) {
            console.error(`Failed to update task ${id}: ${response.statusText}`);
            return null;
        }

        const data: Task = await response.json();
        return data;
    } catch (error) {
        console.error("Unexpected error while updating task:", error);
        return null;
    }
}



export async function deleteTask(id: number): Promise<void> {
    try {
        const response = await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error(`Failed to delete task ${id}: ${response.statusText}`);
        }

    } catch (error) {
        console.error("Unexpected error while deleting task:", error);
    }

}