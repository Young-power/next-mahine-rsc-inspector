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


const program = new Command();

program
  .name("next-mahine-rsc-inspector")
  .description("Inspect and analyze Next.js RSC architecture")
  .addHelpText("before", `
🛰️  Next Mahine RSC Inspector
Analyze your Next.js App Router project and detect Client/Server Components.

`)
  .addHelpText("after", `
Examples:
  $ next-mahine-rsc-inspector
  $ next-mahine-rsc-inspector --json
  $ next-mahine-rsc-inspector --json -o report.txt

`)
  .option("--json", "Output result as JSON")
  .option("-o, --output <file>", "Write report to a file")
  .parse(process.argv)

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

    //json and box
    if (options.json) {
        console.log(boxText.terminal)
        console.log(json)
        return
    }

  // normal → Box only
    console.log(boxText.terminal)


}

main()
