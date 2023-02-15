import { IncomingMessage, ServerResponse } from "node:http"

export interface Request extends IncomingMessage{
    body?: any
}

export type Response = ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
}