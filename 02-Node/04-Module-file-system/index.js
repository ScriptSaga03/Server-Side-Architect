// file operations
import {writeData, readData} from './fileOperations.js'

async function main(){
   await writeData();
  await appendData();
  await readData();

  await deleteFile();
}

main();
