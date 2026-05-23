

import fs from "fs/promises";
import path from 'path'



// create folder
const folderName = "myWorkspace"; 
const filePath = path.join(folderName, "database.txt");
/* recursive: true ka matlab hai agar folder pehle se hai toh error mat do, 
 aur agar nested folders hain (like a/b/c) toh saare ek saath bana do.
 */

export const createFolder = async() => {
  try{
    await fs.mkdir(folderName, {recursive:true});
    console.log(`✅ 📁Folder '${folderName}' created successfully.`);
  }catch(err){
    console.error('❌Error: error occure during folder creation! : ', err.message);
  }
}



// create file

export const writeData = async(userObj)=>{
  try{
    console.log('🗃️ Creating file please wait...');
    const userData = JSON.stringify(userObj, null, 2);
    await fs.writeFile(filePath, userData);
    console.log('✅ file created successfully.');
  }catch(err){
     if(err.code === 'ENOENT'){
       console.error("❌ Error: Folder or path couldn't be found!");
    }else{
       console.error("❌ Error during file creation: ", err.message);
    }
  }
  
}



export const readData = async()=>{
  try{
    const data = await fs.readFile(filePath, "utf-8");
    console.log("\n📖 File received successfully:\n");
    console.log(data);
  }catch(err){
    console.error("❌ Error during reading: ", err.message)
  }
}




// ENOENT ka matlab hota hai Error No Entity (File ya folder nahi mila). Toh jab folder nahi milega, toh fs.writeFile actually ENOENT throw karega, EEXIST nahi.

// EEXIST tab aata hai jab koi cheez pehle se maujood ho aur aap bina permission ke use fir se banane ki koshish karein (jaise bina {recursive: true} ke duplicate folder banana).
