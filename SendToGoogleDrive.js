const fs = require("fs");
const path = require("path");
const GetDriveService = require("./GetDriveService");
const { config } = require("dotenv");

config();

const driveService = GetDriveService;

async function uploadToDrive(filePath, fileName) {
  try {
    const files = await driveService.files.list({
      pageSize: 1000,
      fields: "files(id, name, mimeType, webViewLink)",
    });

    // DELETE SAME NAME FILE ON DRIVE //
    let file = files.data.files.find(f => f.name === process.env.FILE_NAME);
    if(file) {
      console.log("Found a previous file with the same name. Deleting it...");
      await driveService.files.delete({ fileId: file.id });
    }

    // UPLOAD SECTION //

    const fileMetadata = {
      name: fileName,
    };
    const media = { mimeType: "application/octet-stream", body: fs.createReadStream(filePath) };

    file = await driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    const fileId = file.data.id;

    // Make the file public
    await driveService.permissions.create({
      fileId: fileId,
      requestBody: { role: "reader", type: "anyone" },
    });

    // //Allow an email to admin of file
    // await driveService.permissions.create({
    //   fileId: fileId,
    //   requestBody: { role: "writer", type: "user", emailAddress: process.env.OWNER_EMAIL }
    // });
    // //Transfer ownership
    // await driveService.permissions.create({
    //   fileId: fileId,
    //   transferOwnership: true,
    //   requestBody: { role: "owner", type: "user", emailAddress: process.env.OWNER_EMAIL },
    // });

    const publicUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    return publicUrl;
  }
  catch (error) {
    console.error("Error uploading file:", error.message);
  }
}

async function Work() {
    const filePath = path.join(__dirname, "UpdateFile.zip");

    const result = await uploadToDrive(filePath, process.env.FILE_NAME);
    console.log(result);
}

Work();