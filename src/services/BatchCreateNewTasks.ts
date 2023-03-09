import { TaskRepositories } from "../repositories/TaskRepositories"
import path from 'node:path'
import { parseCSV } from "../utils/parse-csv"

export class BatchCreateNewTasksService{
    constructor(private taskRepository: TaskRepositories){}

    async execute(): Promise<void>{
        const csvPath = path.resolve("tmp", "tasks.csv")
        
        await parseCSV({
            path: csvPath,
            onReadFile: async(line) => {
                const [title, description] = line

                const existsTask = await this.taskRepository.findTaskByTitle(title)
        
                if(!existsTask){
                    if(title && description){
                        await this.taskRepository.createNewTask({
                            description,
                            title
                        })
                    }
                }
                   
            }
        })
    }
} 