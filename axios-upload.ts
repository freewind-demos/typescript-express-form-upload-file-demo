import axios from 'axios';
import fs from 'fs';

const file = fs.createReadStream('./package.json');

const uploadUrl = 'http://localhost:3000/upload';

file.on('end', async() => {
  const formData = new FormData();
  formData.append('file', file as any);
  await axios.post(uploadUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
})

console.log('done')

