import { TaskRepositories } from "../repositories/TaskRepositories"

interface IRequest{
    title: string
    description: string
}

export class CreateNewTaskService{
    constructor(private taskRepository: TaskRepositories){}

    async execute({ description, title }: IRequest): Promise<void>{
        const existsTask = await this.taskRepository.findTaskByTitle(title)

        if(existsTask){
            throw new Error("This task title is already in use")
        }

        await this.taskRepository.createNewTask({
            description,
            title
        })
    }
} 