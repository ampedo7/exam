const config = require('../config/files');
const fs = require('fs');

const uploadService = () => {
  const fileUpload = async (file, type) => {
    try {
      let rand = Math.ceil(Math.random() * 1000);
      let filename = `${Date.now()}${rand}${file.name}`;
      let localDir = `${config.storage}/disk/uploads/${type}`;

      let localPath = `${localDir}/${filename}`;
      if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir);
      }
      let returnData = null;

      returnData = {
        path: localPath,
        filename: filename,
        name: file.name,
        size: file.size,
        type: file.type,
      };

      fs.rename(file.path, localPath, function () {});
      return returnData;
    } catch (err) {
      return {
        status: false,
        err: err,
      };
    }
  };

  return { fileUpload };
};

module.exports = uploadService;
