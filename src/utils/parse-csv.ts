import { parse } from 'csv-parse'
import fs from 'node:fs'

interface ParseCSVParams {
  path: string,
  onReadFile: (line: any) => Promise<void>
}

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2 // skip the header line
})

export const parseCSV = async({ onReadFile, path }: ParseCSVParams) => {
  /* const csvPath = new URL(path) */
  
  const stream = fs.createReadStream(path)
  
  const linesParse = stream.pipe(csvParse)
  
  for await (const line of linesParse) {
    await onReadFile(line)
    
    /* const [title, description] = line

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    }) */

    // Uncomment this line to see the import working in slow motion (open the db.json)
    // await wait(1000)
  }
}

/* function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
} */