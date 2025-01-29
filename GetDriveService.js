const { config } = require("dotenv");
const { google } = require("googleapis");

config();

// Load Google credentials
const SERVICE_ACCOUNT_FILE = "creds.json";

const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
});

// const authClient = await auth.getClient();
module.exports = google.drive({ version: "v3", auth });