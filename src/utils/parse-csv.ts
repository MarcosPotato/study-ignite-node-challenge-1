import { parse } from 'csv-parse'
import fs from 'node:fs'

interface ParseCSVParams {
  path: string,
  onReadFile: (line: any) => Promise<void>
}

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
})

export const parseCSV = async({ 
  path, 
  onReadFile
}: ParseCSVParams) => {
  const stream = fs.createReadStream(path)
  
  const linesParse = stream.pipe(csvParse)
  
  for await (const line of linesParse) {
    await onReadFile(line)
  }
}