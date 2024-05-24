import {Context} from '@actions/github/lib/context'
import {GitHub} from '@actions/github/lib/utils'
import {GetResponseTypeFromEndpointMethod, RequestError} from '@octokit/types'
import {Label} from './getLabelsFromOwners'

export async function applyLabels(
  context: Context,
  client: InstanceType<typeof GitHub>,
  labels: Set<Label>
): Promise<void> {
  // create labels if they don't exist
  const p: Promise<GetResponseTypeFromEndpointMethod<typeof client.rest.issues.createLabel>>[] = []
  // store labels in a list; will be used later
  const labelsAll: string[] = []
  try {
    for (const label of labels) {
      labelsAll.push(label.name)
      p.push(
        client.rest.issues.createLabel({
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
    if ((error as RequestError).status !== 422) {
      throw error
    }
  }

  // apply labels to the PR
  // don't even try if no labels
  if (labelsAll.length === 0) {
    return
  }
  await client.rest.issues.addLabels({
    owner: context.issue.owner,
    repo: context.issue.repo,
    // eslint-disable-next-line @typescript-eslint/camelcase
    issue_number: context.issue.number,
    labels: labelsAll
  })
}
