const core = require('@actions/core');
const github = require('@actions/github');
const webhooks = require('@octokit/webhooks');

try {
    // The pull_request exists on payload when a pull_request event is triggered.
    // Sets action status to failed when pull_request does not exist on payload.
    const pr = github.context.payload.pull_request
    if (!pr) {
      core.setFailed('github.context.payload.pull_request not exist')
      throw new Error("pull request did not exist in payload")
    }
  console.log(`The event pull request: ${payload.pull_request}`);
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
    issue_number: github.context.payload.pull_request.number,
    body: message
  })
  core.debug(`created comment URL: ${response.data.html_url}`)
  core.setOutput('comment-url', response.data.html_url)
} catch (error) {
  core.setFailed(error.message);
}