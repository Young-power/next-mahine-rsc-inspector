import boxen from "boxen"
import chalk from "chalk"
import logSymbols from "log-symbols"
import path from "node:path"
import stripAnsi from "strip-ansi"

export function printBox(result: any, durationMs: number) {
  const duration = (durationMs / 1000).toFixed(2) + "s"
  const directory = path.relative(result.projectRoot, result.appDir)

  // Palette de couleurs harmonieuse avec icônes
  const colors = {
    primary: chalk.hex('#3B82F6'),     // Bleu vif mais doux
    secondary: chalk.hex('#10B981'),   // Vert émeraude
    accent: chalk.hex('#8B5CF6'),      // Violet élégant
    muted: chalk.hex('#64748B'),       // Gris doux
    light: chalk.hex('#CBD5E1'),       // Gris clair
    highlight: chalk.hex('#F59E0B'),   // Or chaleureux
  }

  // Icônes stylisées
  const icons = {
    project: '🏢',
    folder: '📁',
    file: '📄',
    client: '🟢',
    server: '🔵',
    channel:'📡',
    chart: '📊',
    check: '✅',
    time: '⏱️',
    component: '🧩',
    divider: '─'
  }

  // Message simple en console
  console.log(colors.secondary(`${icons.check} App directory: ${chalk.white(directory)}`))

  // Création des barres de progression avec un caractère différent
  const clientBarLength = Math.round((result.ratioClient / 100) * 18)
  const serverBarLength = Math.round((result.ratioServer / 100) * 18)
  
  const clientBar = '━'.repeat(clientBarLength) + '─'.repeat(18 - clientBarLength)
  const serverBar = '━'.repeat(serverBarLength) + '─'.repeat(18 - serverBarLength)

  const output = `

${colors.primary.bold("╭────────────────────────────────────╮")}
${colors.primary.bold(`│    ${icons.channel} Next RSC Inspector      │`)}
${colors.primary.bold("╰────────────────────────────────────╯")}

${colors.light(icons.divider.repeat(38))}

${colors.muted(`${icons.project} Project`)}     ${colors.primary.bold(result.projectName)}
${colors.muted(`${icons.folder} Location`)}    ${colors.muted(result.appDir)}

${colors.light(icons.divider.repeat(38))}

${colors.muted.bold(`${icons.file} Component Analysis`)}

${colors.primary(`${icons.file} Total Files`)}        ${chalk.white.bold(result.total.toString().padStart(4))}
${colors.secondary(`${icons.client} Client Components`)}      ${colors.secondary.bold(result.client.toString().padStart(4))}
${colors.accent(`${icons.server} Server Components`)}      ${colors.accent.bold(result.server.toString().padStart(4))}

${colors.light(icons.divider.repeat(38))}

${colors.muted.bold(`${icons.chart} Component Distribution`)}

${colors.secondary(`${icons.client} Client Components`)} ${clientBar} ${colors.secondary.bold(result.ratioClient + "%")}
${colors.accent(`${icons.server} Server Components`)} ${serverBar} ${colors.accent.bold(result.ratioServer + "%")}

${colors.light(icons.divider.repeat(38))}

${colors.highlight.bold(`${icons.check} Analysis completed in ${icons.time} ${duration}`)}
`

  const boxed = boxen(output.trim(), {
    padding: { top: 1, bottom: 1, left: 2, right: 2 },
    borderStyle: "single",
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    margin: { top: 1, bottom: 1 }
  })

  return {
    terminal: boxed,
    file: stripAnsi(boxed)
  }
}