import {Context} from '@actions/github/lib/context'
import * as github from '@actions/github'
import * as octokit from '@octokit/rest'
import {Label} from './getLabelsFromOwners'

export async function applyLabels(
  context: Context,
  // @ts-expect-error fix
  client: github.GitHub,
  labels: Set<Label>
): Promise<void> {
  // create labels if they don't exist
  // @ts-expect-error fix
  const p: Promise<octokit.Response<octokit.IssuesCreateLabelResponse>>[] = []
  // store labels in a list; will be used later
  const labelsAll: string[] = []
  try {
    for (const label of labels) {
      labelsAll.push(label.name)
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
  } catch (error: unknown) {
    // We need to check if the error object is an instance of Error before accessing the 'status' property
    if (error instanceof Error && 'status' in error) {
      if (error.status !== 422) {
        throw error
      }
    } else {
      throw error // If it's not an Error instance, rethrow it
    }
  }

  // apply labels to the PR
  // don't even try if no labels
  if (labelsAll.length === 0) {
    return
  }
  await client.issues.addLabels({
    owner: context.issue.owner,
    repo: context.issue.repo,
    // eslint-disable-next-line @typescript-eslint/camelcase
    issue_number: context.issue.number,
    labels: labelsAll
  })
}
