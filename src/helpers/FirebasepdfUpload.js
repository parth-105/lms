// firebaseUtils.js

import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { db, storage} from '@/firebase'
import { data } from 'autoprefixer';



export const uploadpdfFileAndGetUrl = async (file) => {
  try {
  
    
    const storageRef = ref(storage, `pdfs/${Date.now()}`); 

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
  } catch (error) {
  
    return null; // Handle the error appropriately in your application
  }
};
