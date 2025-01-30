const fs = require("fs");
const path = require("path");
const GetDriveService = require("./GetDriveService");
const { config } = require("dotenv");
const archiver = require("archiver");

config();

const driveService = GetDriveService;

// function copyFolder(src, dest) {
//   try {
//     const entries = fs.readdirSync(src, { withFileTypes: true });

//     // Create the destination folder if it doesn't exist
//     fs.mkdirSync(dest, { recursive: true });

//     for (let entry of entries) {
//       const srcPath = path.join(src, entry.name);
//       const destPath = path.join(dest, entry.name);

//       if (entry.isDirectory()) {
//         copyFolder(srcPath, destPath);
//       } else {
//         fs.copyFileSync(srcPath, destPath);
//       }
//     }
//   } catch (err) {
//     console.error('Error copying folder:', err);
//   }
// }

async function PackBuild() {
  return new Promise((resolve, reject) => {
    const packFileName = "PackFile.zip";

    const output = fs.createWriteStream(packFileName);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Maximum compression
    });
  
    output.on('close', function () {
      console.log(`Archive created successfully: ${archive.pointer()} total bytes`);
      resolve(path.join(__dirname, packFileName));
    });
  
    archive.on('error', function (err) {
      reject(err.message);
    });
  
    archive.pipe(output);
  
    // // Create the Software folder in the archive
    // archive.directory('../' + process.env.IN_BUILD_FOLDER_NAME, process.env.OUT_PARENT_FOLDER_NAME);

    // Récupérer les exclusions depuis .env et les transformer en tableau
    const exclusions = process.env.EXCLUSIONS ? process.env.EXCLUSIONS.split('|').map(pattern => `**/${pattern}/**`) : [];

    archive.glob("**/*", {
      cwd: path.join(__dirname, "../" + process.env.IN_BUILD_FOLDER_NAME),
      ignore: exclusions, // Exclusions dynamiques
    }, { prefix: process.env.OUT_PARENT_FOLDER_NAME });

    archive.finalize();
  });
}

async function uploadToDrive(filePath, fileName) {
  try {
    console.log("Searching for existing files on Drive...");
    const files = await driveService.files.list({
      pageSize: 1000,
      fields: "files(id, name, mimeType, webViewLink)",
    });

    //DELETE SAME NAME FILE ON DRIVE 
    let file = files.data.files.find(f => f.name === fileName);
    if(file) {
      console.log("Found a previous file with the same name. Deleting it...");
      await driveService.files.delete({ fileId: file.id });
    }

    // UPLOAD SECTION //

    const fileMetadata = {
      name: fileName,
    };
    const media = { mimeType: "application/octet-stream", body: fs.createReadStream(filePath) };

    console.log("Uploading file to Drive...");
    file = await driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    const fileId = file.data.id;

    console.log("Changing file permissions...");
    await driveService.permissions.create({
      fileId: fileId,
      requestBody: { role: "reader", type: "anyone" },
    });

    return fileId;
  }
  catch (error) {
    console.error("Error uploading file:", error.message);
  }
}

async function Work() {
  console.log("- Packing software -");
  const packFilePath = await PackBuild();

  console.log("\n- Working with Google Drive API -");
  const resultFileId = await uploadToDrive(packFilePath, process.env.OUT_DRIVE_FILE_NAME);

  console.log("\n- Result -");
  const publicUrl = `https://drive.google.com/file/d/${resultFileId}/view?usp=sharing`;
  // const directDownloadUrl = `https://drive.google.com/uc?export=download&confirm=t&id=${resultFileId}`;
  const directDownloadUrl = `https://drive.usercontent.google.com/download?id=${resultFileId}&export=download&confirm=t`;
  console.log(`Public URL: ${publicUrl}`);
  console.log(`Direct download URL: ${directDownloadUrl}`);

  console.log("\n- Cleaning up -");
  fs.unlinkSync(packFilePath);
}

Work();