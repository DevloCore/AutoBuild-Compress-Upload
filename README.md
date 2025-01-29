# WindowsGoogleBuildTransport

/!\\ Disclaimer: I am not responsible for any data loss or issues that may occur with your project or your Google Drive. /!\\
/!\\ Important: When you run the CMD file, this program remove any existing file on your Google Drive account with the same name as `FILE_NAME` in your .env file /!\\

1. Clone this project
2. Ensure the `AutoPack` folder is inside your project root directory
3. Write a `.env` file according to `.env.example`
4. Download your service account creds on [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
5. Put the json file inside `AutoPack` folder and rename it to `creds.json`
6. Your build should be inside "BuildWindows" folder, at project root directory too
7. Run "RUN_PACK.cmd"
8. You will get the final link in the console. The result file can be downloaded by anyone.