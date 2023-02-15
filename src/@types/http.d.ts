import { IncomingMessage, ServerResponse } from "node:http"

export interface Request extends IncomingMessage{
    body?: any
    params?: {
        [key: string]: string
    }
    query?: {
        [key: string]: string
    }
}

export type Response = ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
}

export interface Route{
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    url: RegExp
    action: (req: Request, res: Response) => Promise<any>
}