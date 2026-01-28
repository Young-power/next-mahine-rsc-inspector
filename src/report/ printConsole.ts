import boxen from "boxen"
import chalk from "chalk"
import logSymbols from "log-symbols"
import path from "node:path"
import stripAnsi from "strip-ansi"

export function printBox(result: any, durationMs: number) {

  const duration = (durationMs / 1000).toFixed(2) + "s"

  const directory = path.relative(result.projectRoot, result.appDir)

  console.log(chalk.green.bold(`${logSymbols.success}  📁 Found app directory ${''}`))
  console.log(
    chalk.green.bold(
      `📁 Using app directory: ${chalk.white.bold(directory)}`
    )
  )
  const output = `
                                               ${chalk.bold.blue("📡 Next RSC Inspector")}

${chalk.white.bold("📁 Project Name")} : ${chalk.green.bold(result.projectName)}
${chalk.white.bold("📦 App Path")} : ${chalk.green.bold(result.appDir)}

📄 ${chalk.white.bold("Total files")}       : ${chalk.white.bold(result.total)}
🧩 ${chalk.white.bold("Client Components")} : ${chalk.green.bold(result.client)}
🧱 ${chalk.white.bold("Server Components")} : ${chalk.yellow.bold(result.server)}

📊 ${chalk.white.bold("Client Percentage")} : ${chalk.magenta.bold(result.ratioClient + "%")}
📊 ${chalk.white.bold("Server Percentage")} : ${chalk.cyan.bold(result.ratioServer + "%")}


${chalk.green.bold(logSymbols.success, " Scan completed in " + duration)}
`

  const boxed = boxen(output.trim(), {
    padding: { top: 1, bottom: 0, left: 3, right: 3 },
    borderStyle: "round",
    borderColor: "cyan"
  })

  return {
    terminal: boxed,        // 🖥️ avec couleurs
    file: stripAnsi(boxed) // 📄 même box, SANS couleurs
  }
}


