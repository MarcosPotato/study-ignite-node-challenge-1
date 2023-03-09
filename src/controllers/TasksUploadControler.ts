import { Request, Response } from "../@types/http"
import { TaskRepositories } from "../repositories/TaskRepositories"
import { BatchCreateNewTasksService } from "../services/BatchCreateNewTasks"

export const TasksUploadControler = {
    create: async(req: Request, res: Response, taskRepository: TaskRepositories) => {
        try {
            const batchCreateNewTasksService = new BatchCreateNewTasksService(taskRepository)
            await batchCreateNewTasksService.execute()

            res.writeHead(200).end()

        } catch (error: any) {
            res.writeHead(400).end(JSON.stringify({
                error: "Failed to create a new task",
                details: error.message
            }))
        }
    }
}