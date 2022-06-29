const core = require("@actions/core");
const github = require("@actions/github");

export async function run() {
  try {
    const token = core.getInput("repo-token");
    if (!token) {
      core.setFailed("Missing token.");
      return;
    }

    const warning = core.getInput("warning");
    const client = new github.GitHub(repoToken);
    const pr = {
      owner: github.context.issue.owner,
      repo: github.context.issue.repo,
      number: github.context.issue.number
    };

    prOpenOptions = ['opened', 'reopened', 'ready-for-review']
    if (!prOpenOptions.includes(github.context.payload.action)) {
      console.log('No pull request was opened, skipping');
      return;
    }

    // Create a comment
    if (!warning) {
      core.setFailed("Missing warning.");
      return;
    }
    await client.rest.issues.createComment({
      owner: pr.owner,
      repo: pr.repo,
      issue_number: pr.number,
      body: warning,
    });

    core.info(
      `Created comment '${warning}' on PR '${pr.number}'.`
    );
  } catch (error) {
    core.setFailed(error.message);
    if (error.message == 'Resource not accessible by integration') {
      core.error(`See this action's readme for details about this error`);
    }
  }
}

run();