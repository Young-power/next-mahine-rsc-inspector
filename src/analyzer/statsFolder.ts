import path from "path"

type FileResult = {
  filePath: string
  isClient: boolean
}

export function computeFolderStats(
  results: FileResult[],
  root: string
) {
  const folders: Record<string, { server: number; client: number }> = {}

  for (const item of results) {
    const absoluteFolder = path.dirname(item.filePath)

    // rend relatif au projet
    const folder = path.relative(root, absoluteFolder)

    if (!folders[folder]) {
      folders[folder] = { server: 0, client: 0 }
    }

    if (item.isClient) folders[folder].client++
    else folders[folder].server++
  }

  return folders
}
