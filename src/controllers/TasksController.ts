import { Request, Response } from "../@types/http";
import { TaskRepositories } from "../repositories/TaskRepositories";
import { CreateNewTaskService } from "../services/CreateNewTask";

export const TaskController = {
    index: async(req: Request, res: Response, taskRepository: TaskRepositories) => {
        try {
            const tasks = await taskRepository.getAllTask()

            res.writeHead(200).end(JSON.stringify(tasks))

        } catch (error: any) {
            res.writeHead(400).end(JSON.stringify({
                error: "Failed to list all tasks",
                details: error.message
            }))
        }
    },
    create: async(req: Request, res: Response, taskRepository: TaskRepositories) => {
        try {
            const createTaskService = new CreateNewTaskService(taskRepository)
            await createTaskService.execute(req.body)

            res.writeHead(200).end()

        } catch (error: any) {
            res.writeHead(400).end(JSON.stringify({
                error: "Failed to create a new task",
                details: error.message
            }))
        }
    }
}