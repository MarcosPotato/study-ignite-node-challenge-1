import http from 'node:http'
import { Request, Response } from './@types/http'
import { json } from './middlewares/json'
import { routes } from './routes'
import { extractQueryParams } from './utils/extract-query-params'

const app = http.createServer(async(req: Request, res: Response) => {
    await json(req, res)

    if(!req.url){
        return res.writeHead(404).end()
    }

    const currentRoute = routes.find(route => (
        route.method === req.method && route.url.test(req.url as string)
    ))

    if(currentRoute){
        const routeParams = req.url.match(currentRoute.url)

        const { query, ...params } = routeParams?.groups as any

        req.params = params
        req.query = query ? extractQueryParams(query) : {}
        
        return currentRoute.action(req, res)
    }

    return res.writeHead(404).end()
})

app.listen(3333, undefined, undefined, () => {
    console.log("App is litening on port 3333")
})