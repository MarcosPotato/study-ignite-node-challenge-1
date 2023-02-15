import { TaskRepositories } from "../repositories/TaskRepositories"

interface IRequest{
    id: string
    title: string
    description: string
}

export class UpdateTaskService{
    constructor(private taskRepository: TaskRepositories){}

    async execute({ description, title, id }: IRequest): Promise<void>{
        const task = await this.taskRepository.findTaskById(id)

        if(!task){
            throw new Error("This task can't exists")
        }

        const existsTaskTitle = await this.taskRepository.findTaskByTitle(title)

        if(existsTaskTitle){
            throw new Error("This task title is already in use")
        }

        if(!title || !description){
            throw new Error("Missing atributes title/description")
        }

        await this.taskRepository.updateTask(id, {
            title,
            description
        })
    }
} 