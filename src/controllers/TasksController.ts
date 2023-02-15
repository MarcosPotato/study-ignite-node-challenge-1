import { Request, Response } from "../@types/http";
import { TaskRepositories } from "../repositories/TaskRepositories";
import { CreateNewTaskService } from "../services/CreateNewTask";
import { DeleteTaskService } from "../services/DeleteTask";
import { MarkAsFInishedTaskService } from "../services/MarkAsFinishedTask";
import { UpdateTaskService } from "../services/UpdateTask";

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
    },
    update: async(req: Request, res: Response, taskRepository: TaskRepositories) => {
        try {
            const { id } = req.params as any
            const updateTaskService = new UpdateTaskService(taskRepository)
            await updateTaskService.execute({id, ...req.body})

            res.writeHead(200).end()

        } catch (error: any) {
            res.writeHead(400).end(JSON.stringify({
                error: "Failed to create a new task",
                details: error.message
            }))
        }
    },
    delete: async(req: Request, res: Response, taskRepository: TaskRepositories) => {
        try {
            const { id } = req.params as any

            const deleteTaskService = new DeleteTaskService(taskRepository)
            await deleteTaskService.execute(id)

            res.writeHead(200).end()

        } catch (error: any) {
            res.writeHead(400).end(JSON.stringify({
                error: "Failed to create a new task",
                details: error.message
            }))
        }
    },
    patch: async(req: Request, res: Response, taskRepository: TaskRepositories) => {
        try {
            const { id } = req.params as any

            const markAsFinishedTaskService = new MarkAsFInishedTaskService(taskRepository)
            await markAsFinishedTaskService.execute(id)

            res.writeHead(200).end()

        } catch (error: any) {
            res.writeHead(400).end(JSON.stringify({
                error: "Failed to create a new task",
                details: error.message
            }))
        }
    },
}