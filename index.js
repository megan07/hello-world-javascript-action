const core = require('@actions/core');
const github = require('@actions/github');
const random = require('random');
const yaml = require('js-yaml');

try {
  const team = core.getInput('team');

  let data = fs.readFileSync('../users.yml', 'utf8')
  let users = yaml.safeLoad(data);
  
  let max = users["users"][team]["members"].length - 1
  let randomNum = random.int(max=max)

  let user = users["users"][team]["members"][randomNum]
  console.log(`Hello ${user}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
} catch (error) {
  core.setFailed(error.message);
}