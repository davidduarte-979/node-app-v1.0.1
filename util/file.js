import { unlink } from 'fs';
const deleteFile = filePath => {
  unlink(filePath, err => {
    if (err) throw err;
  });
};
const _deleteFile = deleteFile;
export { _deleteFile as deleteFile };
