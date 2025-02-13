const readline = require("readline");
const Platform = require("./Platform");
const PackAndSend = require("./PackAndSend");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Select platform (windows, linux, both): ", async (answer) => {
    answer = answer.toLowerCase();
    const toPack = [];
    if(answer === "both") {
        toPack.push(Platform.windows);
        toPack.push(Platform.linux);
    }
    else {
        if (Object.keys(Platform).includes(answer)) {
            const platform = Platform[answer];
            toPack.push(platform);
        } else {
            console.log("Invalid selection. Please choose 'windows', 'linux'.");
        }
    }

    for(const platform of toPack) {
        await PackAndSend(platform);
    }

    rl.close();
});