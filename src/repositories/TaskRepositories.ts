import { Task } from "../models/Task";

interface TaskDTO{
    title: string
    description: string
}

export class TaskRepositories {
    private tasks: Task[] = []

    async createNewTask({ description, title }: TaskDTO): Promise<void> {
        const newTask = new Task()

        Object.assign(newTask, {
            title,
            description,
            completed_at: null,
            created_at: new Date(),
            updated_at: new Date()
        })

        this.tasks.push(newTask)
    }

    async getAllTask(): Promise<Task[]> {
        return this.tasks
    }

    async findTaskById(taskId: string): Promise<Task | undefined> {
        return this.tasks.find(task => task.id === taskId)
    }

    async findTaskByTitle(title: string): Promise<Task | undefined> {
        return this.tasks.find(task => task.title === title)
    }

    async updateTask(taskId: string, data: TaskDTO): Promise<void> {
        this.tasks = this.tasks.map(task => task.id === taskId 
            ? { ...task, ...data, id: task.id, updated_at: new Date() }
            : task
        )
    }

    async deleteTask(taskId: string): Promise<void>{
        this.tasks = this.tasks.filter(task => task.id !== taskId)
    }

    async markAsCompleted(taskId: string): Promise<void>{
        this.tasks = this.tasks.map(task => task.id === taskId 
            ? { ...task, completed_at: new Date(), updated_at: new Date() }
            : task
        )
    }
}