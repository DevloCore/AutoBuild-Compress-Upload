# Auto Build Compress-Upload

## What is it ?
The goal of this small project is to automate compressing and uploading a build of your software/game to Google Drive.\
Type one command, and get a direct download link. That's it.

## How to install

> ⚠️ **Disclaimer**: I am not responsible for any data loss or issues that may occur with your project or your Google Drive.

> ⚠️ **Important**: When you run the project, any existing file (with the same name as `FILE_NAME` in your `.env` file) will be removed on your Google Drive account .

1. Clone this project inside your project root directory
2. Run `npm install`
3. Write a `.env` file according to `.env.example`
4. Download your service account creds on [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
5. Put the creds json file inside this project root directory and rename it to `creds.json`
6. Make sure your build is in the folder named after the env `IN_BUILD_FOLDER_NAME` value, and it must be located inside **YOUR** project directory

## How to run it

1. Type `node ./PackAndSend.js` (or run the super `RUN_PACK.cmd` file)
2. You will get the final link in the console. The result file can be downloaded by anyone.

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