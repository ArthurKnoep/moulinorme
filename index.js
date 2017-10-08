#!/home/arthur/.nvm/versions/node/v8.1.3/bin/node
/*
** index.js for moulinorme in /index.js
** 
** Made by Arthur Knoepflin
** Login arthur.knoepflin@epitech.eu
** 
** Started on Sun Oct 08 2017 14:24:59
** Last update Sun Oct 08 16:15:23 2017
** By Arthur Knoepflin
*/

'use strict';

const commandLineArgs = require('command-line-args');
const pkgjson = require('./package.json');
const colors = require('couleurs');
const fs = require('fs');
const path = require('path');

const verify = require("./file");

const ALERT = [255, 40, 0];

const optionsArgs = [
    {name: 'version', alias: 'v', type: Boolean},
    {name: 'no-header', alias: 'h', type: Boolean}
];

async function treat_file(path_file, config) {
    if (path.basename(path_file).substr(-2) === ".c") {
        const a = await verify.verify_c_file(path_file, config);
        console.log(a);
    } else if (path.basename(path_file).substr(-2) === ".h") {
        
    } else if (path.basename(path_file) === "Makefile") {
        
    }
}

function treat_folder_file(list, config) {
    list.forEach(function(elem) {
        try {
            let stat = fs.statSync(elem);
            if (stat.isDirectory()) { 
                if (path.basename(elem) !== ".git") {
                    try {
                        let directory = fs.readdirSync(elem);
                        directory.forEach(function (new_file_folder, idx) {
                            directory[idx] = path.join(elem, new_file_folder);
                        });
                        treat_folder_file(directory, config);
                    } catch (err) {
                        console.error(colors("Cannot open directory", ALERT) + " : " + elem + "\nReason : " + err);
                    }                
                }
            } else if (stat.isFile()) {
                treat_file(elem, config);
            } else {
                console.error(colors("Cannot verify " + elem, ALERT) + " : is not a file or a directory");
            }
        } catch (err) {
            console.error(colors("Cannot stat " + elem, ALERT) + "\nReason : " + err);
        }
    });
}

function get_directory(options) {
    if (typeof options._unknown === "undefined") {
        return ["./"];
    } else {
        return options._unknown;
    }
}

function main() {
    const options = commandLineArgs(optionsArgs, {partial: true});
    let config = {
        no_header: (options["no-header"] || false)
    };

    if (options.version) {
        console.log("Version : " + pkgjson.version);
    } else {
        let directory = get_directory(options);
        treat_folder_file(directory, config);
    }
}
main();