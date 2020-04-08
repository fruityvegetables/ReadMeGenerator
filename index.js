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
    const queryUrl = `https://api.github.com/users/${username}`;


    axios.get(queryUrl).then(function(res) {
        const avatar = res.data.avatar_url;
        const email = res.data.email;
    //  console.log(res);
    //   const repoNames = res.data.map(function(repo) {
    //     return repo.name;
      }).then(
        inquirer
        .prompt([{
          message: "Enter the name of your repo: ",
          name: "userRepo"
        },
        { 
            message: "blah",
            name: "blah"
        }])
        .then(function({ userRepo, blah }){
            //console.log(userRepo,blah);
            let array = [userRepo, blah];
            const content = array.join("\n");
            fs.writeFile("README.md", content, function(err){
                if (err){ 
                    throw err;
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