#!/usr/bin/env node
import { Command } from "commander"
import { scanProject } from "./index"
import process from "process"
import { createSpinner } from "nanospinner";
import chalk from "chalk";
import { useTimer } from "./hook/useTimer";
import { printBox } from "./report/ printConsole";
import fs from "fs"
import logSymbols from "log-symbols";
import { printStatsFolder } from "./report/printStatsFolders";



const program = new Command();

// Palette de couleurs cohérente avec le reste de l'app
const colors = {
  primary: chalk.hex('#3B82F6'),
  secondary: chalk.hex('#10B981'),
  accent: chalk.hex('#8B5CF6'),
  muted: chalk.hex('#64748B'),
  light: chalk.hex('#CBD5E1'),
  highlight: chalk.hex('#F59E0B'),
}

// Configuration du help personnalisé
program
  .name("next-mahine-rsc-inspector")
  .description("Inspect and analyze Next.js RSC architecture")
  .addHelpText("before", `
${colors.primary.bold("╭────────────────────────────────────╮")}
${colors.primary.bold("│    🛰️  Next RSC Inspector          │")}
${colors.primary.bold("╰────────────────────────────────────╯")}

${colors.muted("Analyze your Next.js App Router project")}
${colors.muted("and detect Client/Server Components.")}

${colors.light("─".repeat(50))}
`)
  .addHelpText("after", `
${colors.light("─".repeat(50))}

${colors.muted.bold("📋 Examples:")}

  ${colors.primary("$")} ${chalk.white("next-mahine-rsc-inspector")}
  ${colors.primary("$")} ${chalk.white("next-mahine-rsc-inspector --json")}
  ${colors.primary("$")} ${chalk.white("next-mahine-rsc-inspector --json -o report.txt")}
  ${colors.primary("$")} ${chalk.white("next-mahine-rsc-inspector --by-folder")}

${colors.light("─".repeat(50))}

${colors.secondary.bold(`${logSymbols.success} Scan your project for RSC architecture`)}
`)
  .option("--json", "Output result as JSON")
  .option("-o, --output <file>", "Write report to a file")
  .option("--by-folder", "Show stats by folder");

// NE PAS appeler .parse() ici, on va le faire conditionnellement

const options = program.opts();

async function main() {


  const spinner = createSpinner("🛰️ Analyzing project...").start();

  const timer = useTimer();

  await new Promise(resolve => setTimeout(resolve, 3000))

  spinner.stop()

  const result = await scanProject(process.cwd())

  const duration = timer.end()



  if (!result) {
    console.log(chalk.red.bold(logSymbols.error, ' No app/ directory found (checked /app and /src.)'))
    spinner.error(chalk.red.bold('Scan failed'))
    return;
  }

  const boxText = printBox(result, duration);
  const json = JSON.stringify(result, null, 2)


  //json and output
  if (options.json && options.output) {
    const content = boxText.file + "\n\n" + json
    fs.writeFileSync(options.output, content, "utf-8");
    console.log(chalk.green.bold(logSymbols.success, 'written successfuly'))
    return
  }

  // json only → no box, just JSON
  if (options.json) {
    console.log(json)
    return;
  }

  // normal → Box only (sauf si --by-folder est spécifié)
  if (!options.byFolder) {
    console.log(boxText.terminal)
  }

  const statsFolders = printStatsFolder(options, result)

  if (statsFolders) {
    console.log(statsFolders);
  }


}

// Logique principale
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  // Afficher le help stylisé si --help ou -h est explicitement demandé
  program.parse(process.argv);
} else {
  // Sinon, exécuter normalement
  program.parse(process.argv);
  main().catch(console.error);
}