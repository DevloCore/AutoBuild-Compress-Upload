const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const GetDriveService = require("../GetDriveService");
const { config } = require("dotenv");
const { DeleteFile } = require("../DriveHelper");

config();

async function Work() {
    const driveService = GetDriveService;
    
    //Get all uploaded files
    const files = await driveService.files.list({
        pageSize: 1000,
        fields: "files(id, name, mimeType, webViewLink)",
    });

    for(const file of files.data.files) {
        await DeleteFile(file.id);
    }
    
    console.log("All files deleted");
}

Work();