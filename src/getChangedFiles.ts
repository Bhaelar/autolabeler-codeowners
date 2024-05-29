import {Context} from '@actions/github/lib/context'

type FileObject = {
  filename: string
}

export async function getChangedFiles(
  context: Context,
  client: {
    pulls: {
      listFiles: (arg0: {
        owner: string; repo: string
        // eslint-disable-next-line @typescript-eslint/camelcase
        pull_number: number
        // eslint-disable-next-line @typescript-eslint/camelcase
        per_page: number
      }) => any
    }
  }
): Promise<string[]> {
  if (!['push', 'pull_request'].includes(context.eventName)) {
    throw new Error(`Unexpected event: ${context.eventName}`)
  }

  // Note: the per_page param is set to the max value for a single page (100)
  // TODO: implement pagination to get all files if > 100
  // TODO: use graphql api
  const files = await client.pulls.listFiles({
    owner: context.issue.owner,
    repo: context.issue.repo,
    // eslint-disable-next-line @typescript-eslint/camelcase
    pull_number: context.issue.number,
    // eslint-disable-next-line @typescript-eslint/camelcase
    per_page: 100
  })

  return files.data.map((x: FileObject) => x.filename)
}
