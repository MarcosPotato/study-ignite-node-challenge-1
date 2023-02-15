import { v4 as uuidV4 } from "uuid"

export class Task {
    id: string
    title: string
    description: string
    completed_at: Date | null
    created_at: Date
    updated_at: Date

    constructor(){
        this.id = uuidV4()
    }
}