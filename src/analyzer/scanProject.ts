import fg from "fast-glob"
import path from "path"
import fs from "fs"
import { analyzeFile } from "./analyzeFile"
import { computeStats } from "./stats"

export async function scanProject(root: string) {
  const projectName = path.basename(root)

  const appDir1 = path.join(root, "app")
  const appDir2 = path.join(root, "src")

  let appDir: string | null = null

  if (fs.existsSync(appDir1)) appDir = appDir1
  if (fs.existsSync(appDir2)) appDir = appDir2

  if (!appDir) {
    return null
  }

  const files = await fg("**/*.{ts,tsx,js,jsx}", {
    cwd: appDir,
    absolute: true
  })

  const results = files.map(file => analyzeFile(file))
  const stats = computeStats(results)

  return {
    projectName,
    projectRoot: root,
    appDir,
    total: stats.total,
    client: stats.client,
    server: stats.server,
    ratioServer: stats.ratioServer,
    ratioClient: stats.ratioClient
  }
}
