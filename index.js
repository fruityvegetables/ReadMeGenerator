// const questions = [

// ];

// function writeToFile(fileName, data) {
// }

// function init() {

// }

// init();


const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

 inquirer
    .prompt([{
      message: "Enter the title of your project: ",
      name: "title"
    },
    {
      message: "Enter the badge for your project: ",
      name: "badge"
    },
    {
      message: "Give a description of your project: ",
      name: "description"
    },
    {
      message: "Put something in the installation section: ",
      name: "install"
    },
    {
      message: "Put something in the usage section: ",
      name: "usage"
    },
    {
      message: "What type of license will you be using?: ",
      name: "license"
    },
    {
      message: "Talk about contributing here: ",
      name: "contrib"
    },
    {
      message: "Describe your testing methods: ",
      name: "tests"
    }])
  .then(function (data) {
    //console.log(title, badge, description, install, usage, license, contrib, tests, questions);
    const { title, badge, description, install, usage, license, contrib, tests, questions } = data;
    // console.log(title);
    // console.log(contrib);
    const template = `# ${title} [![BADGE](https://img.shields.io/badge/License%3A-MIT-blue)](https://img.shields.io/badge/License%3A-MIT-blue)
## Description
${description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Credits](#contributing)
* [Testing](#tests)
* [Questions](#questions)
## Installation
${install}
## Usage
${usage}
## License
${license}
## Contributing
${contrib}
## Tests
${tests}
## Questions
`;
    return template
  })
  .then(function (html) {
    writeFileAsync("README.md", html)
    console.log("You created a README!");
  })
  .then(function(){
    return inquirer
    .prompt({
      message: "Enter your GitHub username:",
      name: "username"
    })

  })
  .then(function ({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    return axios
      .get(queryUrl)
      .then(function (res) {
        const avatar = res.data.avatar_url;
        const username = res.data.login;
        //console.log(res.data);
        return [avatar, username];
        
        // const email = res.data.email;      
        //  console.log(res);
        //   const repoNames = res.data.map(function(repo) {
        //     return repo.name;
      })


  })
  .then(function (array) {
    const ava = `![avatarImage](${array[0]}) | [Link to my GitHub](https://github.com/${array[1]})`;
    appendFileAsync("README.md", ava)
    console.log("You appended your GitHub image to this README!");
  });



    //   inquirer
    //   .prompt({
    //     type: "list",
    //     message: "Select your repo: ",
    //     name: "repo",
    //     choices: repoNames
    //   })
    //   const repoNamesStr = repoNames.join("\n");

    //   fs.writeFile("README.md", repoNamesStr, function(err) {
    //     if (err) {
    //       throw err;
    //     }

    //     //console.log(`Saved ${repoNames.length} repos`);
    //   });
    // });
