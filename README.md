# Post a comment javascript action

This action adds a comment to an open PR

## Inputs

## `repo-token`

**Required** The repo's GITHUB_TOKEN.

## `warning`

**Required** The warning message to comment.

## Example usage
```
uses: actions/hello-world-javascript-action@v1.5
with:
  repo-token: ${{ secrets.GITHUB_TOKEN }}
  warning: "a warning"
```