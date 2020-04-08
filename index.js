// const questions = [

// ];

// function writeToFile(fileName, data) {
// }

// function init() {

// }

// init();


const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl).then(function(res) {
      const repoNames = res.data.map(function(repo) {
        return repo.name;
      });
      inquirer
      .prompt({
        type: "list",
        message: "Select your repo: ",
        name: "repo",
        choices: repoNames
      })
      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("README.md", repoNamesStr, function(err) {
        if (err) {
          throw err;
        }

        //console.log(`Saved ${repoNames.length} repos`);
      });
    });
  });