import fs from "fs"

export const  analyzeFile = (filePath: string) => {
  const code = fs.readFileSync(filePath, "utf-8")

  const isClient =
    code.startsWith('"use client"') ||
    code.startsWith("'use client'") ||
    code.includes('\n"use client"') ||
    code.includes("\n'use client'")

  return {
    filePath,
    isClient
  }
}
