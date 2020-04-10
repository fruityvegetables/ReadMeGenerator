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

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function ({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;


    axios.get(queryUrl).then(function (res) {
      const avatar = res.data.avatar_url;
      const email = res.data.email;
      //  console.log(res);
      //   const repoNames = res.data.map(function(repo) {
      //     return repo.name;
    }).then(
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
        },
        {
          message: "Add some questions if appropriate: ",
          name: "questions"
        }])
        .then(function ({ title, badge, description, install, usage, license, contrib, tests, questions }) {
          //console.log(title, badge, description, install, usage, license, contrib, tests, questions);
          let array = [title, badge, description, install, usage, license, contrib, tests, questions];
          const content = array.join("\n");
          fs.writeFile("README.md", content, function (err) {
            if (err) {
              throw err;
            } else {
              return `
              # ${title} ${badge}
              ## Description
              ${description}
              ## Table of Contents
              * [Installation](#install)
              * [Usage](#usage)
              * [License](#license)
              * [Contribution](#contrib)
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
              ${questions}
              `;
            }
            console.log("done");
          })
        })

    )
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
  });