const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  if !payload.pull_request {
    core.setFailed('github.context.payload.pull_request not exist')
    return
  }

  // Get input parameters.
  const token = core.getInput('repo-token')

  // Create a GitHub client.
  const client = new github.GitHub(token)

  // Get owner and repo from context
  const owner = github.context.repo.owner
  const repo = github.context.repo.repo
  const message = "my message"

  // Create a comment on PR
  // https://octokit.github.io/rest.js/#octokit-routes-issues-create-comment
  const response = await client.issues.createComment({
    owner,
    repo,
    issue_number: pr.number,
    body: message
  })
  core.debug(`created comment URL: ${response.data.html_url}`)

  core.setOutput('comment-url', response.data.html_url)

} catch (error) {
  core.setFailed(error.message);
}