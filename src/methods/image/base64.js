const fs     = require('fs');
const config = require('../../config/files');

module.exports = async function (baseImage, path, filename) {
  const uploadPath = config.storage;
  const localPath = `${uploadPath}/${path}/`;

  const ext      = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
  const fileType = baseImage.substring("data:".length,baseImage.indexOf("/"));
  const regex    = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');

  const base64Data = baseImage.replace(regex, "");
  const rand       = Math.ceil(Math.random()*1000);

  if ( !filename ) {
      filename = `${Date.now()}${rand}.${ext}`;
  }
  
  if (!fs.existsSync(localPath)) {
      fs.mkdirSync(localPath);
  }

  const pathfile = localPath+filename
  fs.writeFileSync(pathfile, base64Data, 'base64');

  return new Promise(resolve => {
      resolve({
        path: path + '/' + filename
      })
  })
}
