import express from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import path from 'path';

const app = express();

app.use(express.static('./public'));

app.use(fileUpload({
  debug: true,
}));

app.post('/upload', (req, res) => {
  if (req.files) {
    const someFile = req.files.someFile;
    if (Array.isArray(someFile)) {
      res.send('Not support uploading multiple files')
    } else {
      const uploadingDir = path.resolve('./uploadFiles');
      if (!fs.existsSync(uploadingDir)) {
        fs.mkdirSync(uploadingDir, {recursive: true});
      }
      fs.writeFileSync(path.resolve(uploadingDir, someFile.name), someFile.data, {flag: 'w'});
    }
  }
  res.send(`Uploaded`);
});

app.listen(3000, () => {
  console.log('listen on http://localhost:3000')
});
