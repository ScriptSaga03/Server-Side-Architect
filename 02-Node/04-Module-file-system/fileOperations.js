import fs from "fs/promises";



// write files
export const writeData = async()=>{
    try{
      const content = "User Name: Mehtab\nRole: Backend Developer\nStatus: Learning Node.js🚀";

      await fs.writeFile('database.txt', content);
      console.log('📝 File created successfully.');
    }catch(err){
      console.error("❌ Error: error occure :", err.message);
    }
}



// Read Files
export const readData = async()=>{
    try{
      const data = await fs.readFile('database.txt', 'utf-8');
      console.log("\n File received successfully:\n");
      console.log(data);
    }catch(err){
      console.log("❌ Error: during reading file: ",err.message)
    }
}



// Append file
export const appendData = async () => {
  try {
    const additionalContent =
      "\n\n ⏰ Last Updated: " + new Date().toLocaleTimeString();
    await fs.appendFile("database.txt", additionalContent);
    console.log('➕ Data appended successfully.');
  } catch (err) {
    console.error("❌ Error during appending: ", err.message);
  }
};


// Delete Files
export const deleteFile = async () => {
    try {
        await fs.unlink('database.txt');
        console.log('🗑️ File deleted successfully from disk.');
    } catch (err) {
        console.error("❌ Error during deletion: ", err.message);
    }
}
