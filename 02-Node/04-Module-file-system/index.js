// file operations
// import {writeData, readData} from './fileOperations.js'

// async function main(){
//    await writeData();
//   await appendData();
//   await readData();

//   await deleteFile();
// }



import {writeData, readData,  createFolder} from './fileOperations.js'
const userContent = {
  id: "A0W" + Math.floor(100 + Math.random() * 900),
  name:'mehtab',
  role:'backend developer',
  status:'Learning Node.js 🚀',
  loginAt: new Date().toLocaleTimeString()
}


async function main(){
  await createFolder();
  await writeData(userContent);
  await readData();
}


main();
