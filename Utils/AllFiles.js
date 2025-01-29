const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const GetDriveService = require("../GetDriveService");
const { config } = require("dotenv");

config();

async function Work() {
    const driveService = GetDriveService;
    
    //Get all uploaded files
    const files = await driveService.files.list({
        pageSize: 1000,
        fields: "files(id, name, mimeType, webViewLink)",
    });

    // for(const file of files.data.files) {
    //     DeleteFile(file.id);
    // }
    console.log(files.data.files);
}

Work();