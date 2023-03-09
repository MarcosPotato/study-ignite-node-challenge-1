import { buildRoutePath } from "../utils/build-route-params";
import { Request, Response, Route } from "../@types/http";
import { TaskController } from "../controllers/TasksController";
import { TaskRepositories } from "../repositories/TaskRepositories";
import { TasksUploadControler } from "../controllers/TasksUploadControler";

const taskRepository = new TaskRepositories()

export const routes: Route[] = [
    {
        method: "POST",
        url: buildRoutePath("/task"),
        action: (req: Request, res: Response) => TaskController.create(req, res, taskRepository)
    },
    {
        method: "POST",
        url: buildRoutePath("/task/import"),
        action: (req: Request, res: Response) => TasksUploadControler.create(req, res, taskRepository)
    },
    {
        method: "GET",
        url: buildRoutePath("/task"),
        action: (req: Request, res: Response) => TaskController.index(req, res, taskRepository)
    },
    {
        method: "PUT",
        url: buildRoutePath("/task/:id"),
        action: (req: Request, res: Response) => TaskController.update(req, res, taskRepository)
    },
    {
        method: "DELETE",
        url: buildRoutePath("/task/:id"),
        action: (req: Request, res: Response) => TaskController.delete(req, res, taskRepository)
    },
    {
        method: "PATCH",
        url: buildRoutePath("/task/:id/complete"),
        action: (req: Request, res: Response) => TaskController.patch(req, res, taskRepository)
    }
]