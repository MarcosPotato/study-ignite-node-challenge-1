import { TaskRepositories } from "../repositories/TaskRepositories"

export class DeleteTaskService{
    constructor(private taskRepository: TaskRepositories){}

    async execute(id: string): Promise<void>{
        const task = await this.taskRepository.findTaskById(id)

        if(!task){
            throw new Error("This task doesn't exists")
        }
        
        await this.taskRepository.deleteTask(id)
    }
} 