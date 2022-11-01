function organize(dirPath) {
  let destPath;
  if (dirPath) {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      destPath = path.join(dirPath, "organized_files");
      if (fs.existsSync(destPath) === false) {
        fs.mkdirSync(destPath);
      }
    } else {
      console.log("please provide valid path");
      return;
    }
  } else {
    destPath = process.cwd();
    console.log("please provide path");
    return;
  }
  organizerHelper(dirPath, destPath);
}

function organizerHelper(src, dest) {
  let childNames = fs.readdirSync(src);
  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(src, childNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();
    if (isFile) {
      let category = getCategory(childNames[i]);
      console.log(childNames[i], category);

      sendFile(childAddress, dest, category);
    }
  }
}

function sendFile(srcFilePath, dest, category) {
  let categoryPath = path.join(dest, category);
  if (fs.existsSync(categoryPath) === false) {
    fs.mkdirSync(categoryPath);
  }
  let fileName = path.basename(srcFilePath);
  let destFilePath = path.join(categoryPath, fileName);
  fs.copyFileSync(srcFilePath, destFilePath);
  fs.unlinkSync(srcFilePath);
}

function getCategory(file) {
  let ext = path.extname(file).slice(1);
  for (let type in types) {
    let cTypeArray = types[type];

    for (let j = 0; j < cTypeArray.length; j++) {
      if (ext === cTypeArray[j]) {
        return type;
      }
    }
  }
  return "other";
}

module.exports = { organize };
