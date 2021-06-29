const core = require('@actions/core');
const fs = require('fs');
const github = require('@actions/github');
const random = require('random');
const yaml = require('js-yaml');

try {
  const team = core.getInput('team');

  let users = yaml.safeLoad(fs.readFileSync('.github/users.yml', 'utf8'));
  let randomNum = random.int(0, users["users"][team]["members"].length - 1)

  let user = users["users"][team]["members"][randomNum]
  console.log(`Hello ${user}!`);

  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${github.context.payload._links.self.href}`);

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
} catch (error) {
  core.setFailed(error.message);
}