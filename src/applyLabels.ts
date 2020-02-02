import {Context} from '@actions/github/lib/context'
import * as github from '@actions/github'
import * as octokit from '@octokit/rest'
import {Label} from './getLabelsFromOwners'

export async function applyLabels(
  context: Context,
  client: github.GitHub,
  labels: Label[]
): Promise<octokit.Response<octokit.IssuesAddLabelsResponse>> {
  // create labels if they don't exist
  const p: Promise<octokit.Response<octokit.IssuesCreateLabelResponse>>[] = []
  try {
    for (const label of labels) {
      p.push(
        client.issues.createLabel({
          owner: context.issue.owner,
          repo: context.issue.repo,
          name: label.name,
          color: label.color
        })
      )
    }
    await Promise.all(p)
  } catch (error) {
    // if 422, label already exists
    if (error.status !== 422) {
      throw error
    }
  }

  // apply labels to the PR
  return client.issues.addLabels({
    owner: context.issue.owner,
    repo: context.issue.repo,
    // eslint-disable-next-line @typescript-eslint/camelcase
    issue_number: context.issue.number,
    labels: labels.map(elem => elem.name)
  })
}
