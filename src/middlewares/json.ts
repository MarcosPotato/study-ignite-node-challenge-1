import { Request, Response } from "../@types/http"

export const json = async (req: Request, res: Response) => {
    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }
}