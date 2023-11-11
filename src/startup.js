const fs = require('fs');
const path = require('path');
const configfile = path.join(__dirname, 'config.json');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const axios = require('axios');
// ANSI escape codes for color
const colorReset = '\x1b[0m';
const colorBright = '\x1b[1m';
const colorFgCyan = '\x1b[36m';
const colorFgRed = '\x1b[31m';
const colorFgGreen = '\x1b[32m';
const colorFgYellow = '\x1b[33m';

// check if the file exists
let con = undefined;
function setConfig(options){
    con = options;
}
function main(){
if (!fs.existsSync(configfile)) {
    if(con == undefined){
        console.log('Looks like you are a new user. Please answer a few questions to get started.');

    readline.question(`${colorBright}${colorFgCyan}Please enter your https://makersuite.google.com ${colorReset}`, (keys) => {
        const key = keys;

        readline.question(`${colorBright}${colorFgCyan}Please enter your userid  ${colorReset}`, (id) => {
            const userid = id;

            const config = {
                key: key,
                userid: userid
            };

            // write the config to the file
            fs.writeFileSync(configfile, JSON.stringify(config, null, 2));

            console.log('Configuration saved successfully.');
            readline.close();
        });
    });
}
} else {
    const i = fs.readFileSync(configfile);
    const c= JSON.parse(i);
    let config = con || c;

    readline.question(`${colorBright}${colorFgGreen}User: ${colorReset}${colorFgYellow}`, (question) => {

        let input = {
            url: 'https://agreeable-boa-bathing-suit.cyclic.app',
            method: 'GET',
            headers: {
            message: question,
            userid: `${config.userid}`,
            key:`${config.key}`,
            },
        }
        axios(input).then(async (response) => {
          console.log(`${colorBright}${colorFgGreen}AI: ${colorReset}${colorFgYellow}${response.data.response}${colorReset}`)
          main();
        });
    })

}
}

module.exports = {
    main,
    setConfig
}