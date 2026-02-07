import chalk from "chalk"
import { OptionValues } from "commander"
import { resultType } from "../types"


export const printStatsFolder = (options: OptionValues, result: resultType) => {
    if (!options.byFolder || !result?.folders) return ""

    // Simple and elegant color palette
    const colors = {
        primary: chalk.hex('#3B82F6'),        // Soft blue
        secondary: chalk.hex('#10B981'),      // Soft green
        accent: chalk.hex('#8B5CF6'),         // Soft purple
        
        muted: chalk.hex('#6B7280'),          // Medium gray
        light: chalk.hex('#9CA3AF'),          // Light gray
        dark: chalk.hex('#1F2937'),           // Dark gray
        
        background: chalk.bgHex('#F3F4F6'),   // Very light gray background
        
        serverBar: chalk.hex('#60A5FA'),      // Light blue for server
        clientBar: chalk.hex('#34D399'),      // Light green for client
    }

    // Professional header
    let output = "\n"
    output += colors.background.black.bold(" 📊 FOLDER STATISTICS ") + "\n"
    output += colors.light("─".repeat(50)) + "\n\n"

    // Get and sort folders
    const folders = Object.keys(result.folders)
    folders.sort((a, b) => a.localeCompare(b))

    // Variables for totals
    let totalServer = 0
    let totalClient = 0

    for (const folder of folders) {
        const stats = result.folders[folder]
        const folderTotal = stats.server + stats.client
        
        // Add to global totals
        totalServer += stats.server
        totalClient += stats.client

        // Calculate percentages
        const serverPercentage = folderTotal > 0 
            ? Math.round((stats.server / folderTotal) * 100) 
            : 0
        const clientPercentage = folderTotal > 0 
            ? Math.round((stats.client / folderTotal) * 100) 
            : 0

        // Create visual progress bar
        const barLength = 20
        const serverBar = '█'.repeat(Math.round((serverPercentage / 100) * barLength))
        const clientBar = '▓'.repeat(Math.round((clientPercentage / 100) * barLength))
        const emptyBar = '░'.repeat(barLength - serverBar.length - clientBar.length)

        // Display folder name
        output += colors.primary.bold(`📁 ${folder}\n`)
        
        // Progress bar
        output += colors.light("  ┌─") + "─".repeat(barLength) + colors.light("─┐\n")
        output += `  │${colors.serverBar(serverBar)}${colors.clientBar(clientBar)}${emptyBar}│\n`
        output += colors.light("  └─") + "─".repeat(barLength) + colors.light("─┘\n")
        
        // Statistics details
        output += colors.light("  ├─") + "─".repeat(25) + colors.light("─┤\n")
        output += `  │ ${colors.primary("● Server")}: ${colors.primary.bold(stats.server.toString().padEnd(4))} `
        output += `${colors.muted("(" + serverPercentage + "%)").padEnd(7)} `
        output += `${colors.secondary("● Client")}: ${colors.secondary.bold(stats.client.toString().padEnd(4))} `
        output += `${colors.muted("(" + clientPercentage + "%)")} │\n`
        output += colors.light("  └─") + "─".repeat(25) + colors.light("─┘\n")
        
        // Folder total
        output += `  ${colors.dark.bold("Total:")} ${colors.primary.bold(folderTotal.toString())} files\n`
        
        // Separator between folders (except for the last one)
        if (folder !== folders[folders.length - 1]) {
            output += colors.light("  " + "─".repeat(45)) + "\n\n"
        }
    }

    // Footer with global summary
    output += "\n" + colors.light("─".repeat(50)) + "\n"
    
    const globalTotal = totalServer + totalClient
    const serverGlobalPercentage = globalTotal > 0 
        ? Math.round((totalServer / globalTotal) * 100) 
        : 0
    const clientGlobalPercentage = globalTotal > 0 
        ? Math.round((totalClient / globalTotal) * 100) 
        : 0

    output += colors.background.black.bold(" 📈 SUMMARY ") + "\n\n"
    
    // Global progress bar
    const globalBarLength = 30
    const globalServerBar = '█'.repeat(Math.round((serverGlobalPercentage / 100) * globalBarLength))
    const globalClientBar = '▓'.repeat(Math.round((clientGlobalPercentage / 100) * globalBarLength))
    const globalEmptyBar = '░'.repeat(globalBarLength - globalServerBar.length - globalClientBar.length)
    
    output += ` ${colors.primary("Server")} ${colors.serverBar(globalServerBar)}${colors.clientBar(globalClientBar)}${globalEmptyBar} `
    output += colors.muted(`${serverGlobalPercentage}% / ${clientGlobalPercentage}%`) + "\n\n"
    
    // Detailed totals
    output += colors.light("  ├─") + "─".repeat(20) + colors.light("─┤\n")
    output += `  │ ${colors.primary.bold("Server:")} ${colors.primary(totalServer.toString().padStart(6))} files `
    output += colors.muted(`(${serverGlobalPercentage}%)`) + " │\n"
    output += `  │ ${colors.secondary.bold("Client:")}  ${colors.secondary(totalClient.toString().padStart(6))} files `
    output += colors.muted(`(${clientGlobalPercentage}%)`) + " │\n"
    output += colors.light("  ├─") + "─".repeat(20) + colors.light("─┤\n")
    output += `  │ ${colors.accent.bold("TOTAL:")}   ${colors.accent.bold(globalTotal.toString().padStart(6))} files `
    output += colors.muted("(100%)") + " │\n"
    output += colors.light("  └─") + "─".repeat(20) + colors.light("─┘\n")

    return output
}