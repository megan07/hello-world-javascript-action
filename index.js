const core = require('@actions/core');
const fs = require('fs');
const github = require('@actions/github');
const random = require('random');
const yaml = require('js-yaml');

try {
  const team = core.getInput('team');

  let data = fs.readFileSync('.github/users.yml', 'utf8')
  let users = yaml.safeLoad(data);

  console.log(users)
  
  let max = users["users"][team]["members"].length - 1
  let randomNum = random.int(max=max)

  console.log(randomNum, max)

  let user = users["users"][team]["members"][randomNum]
  console.log(`Hello ${team} ${user}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
} catch (error) {
  core.setFailed(error.message);
}