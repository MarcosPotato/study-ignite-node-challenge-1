import { buildRoutePath } from "../utils/build-route-params";
import { Request, Response, Route } from "../@types/http";
import { TaskController } from "../controllers/TasksController";
import { TaskRepositories } from "../repositories/TaskRepositories";

const taskRepository = new TaskRepositories()

export const routes: Route[] = [
    {
        method: "POST",
        url: buildRoutePath("/task"),
        action: (req: Request, res: Response) => TaskController.create(req, res, taskRepository)
    },
    {
        method: "GET",
        url: buildRoutePath("/task"),
        action: (req: Request, res: Response) => TaskController.index(req, res, taskRepository)
    }
]