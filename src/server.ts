import http from 'node:http'
import { json } from './middlewares/json'

const app = http.createServer(async(req, res) => {
    await json(req, res)

    
})

app.listen(3333, undefined, undefined, () => {
    console.log("App is litening on port 3333")
})