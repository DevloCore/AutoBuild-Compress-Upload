const GetDriveService = require("./GetDriveService");

async function DeleteFile(id) {
    const driveService = GetDriveService;
    await driveService.files.delete({ fileId: id });
}

module.exports = { DeleteFile };