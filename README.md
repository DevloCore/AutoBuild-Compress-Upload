# Windows Google Build Transport

> ⚠️ **Disclaimer**: I am not responsible for any data loss or issues that may occur with your project or your Google Drive.

> ⚠️ **Important**: When you run the CMD file, this program remove any existing file on your Google Drive account with the same name as `FILE_NAME` in your `.env` file.

1. Clone this project inside your project root directory
2. Run `npm install`
2. Write a `.env` file according to `.env.example`
3. Download your service account creds on [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
4. Put the json file inside this project root directory and rename it to `creds.json`
5. Your build should be in the folder named after the `process.env.IN_BUILD_FOLDER_NAME` value, and this build folder inside **YOUR** project directory
6. Run "RUN_PACK.cmd"
7. You will get the final link in the console. The result file can be downloaded by anyone.

## Project structure you must have
```
.
└── YourOwnProject
    ├── YourOutputBuildFolder
    └── WindowsGoogleBuildTransport *(clone of this repo)*
        ├── .env
        ├── creds.json
        └── RUN_PACK.cmd
```