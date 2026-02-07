import chalk from "chalk"
import { OptionValues } from "commander"
import { resultType } from "../types"

export const printStatsFolder = (options: OptionValues, result: resultType) => {
    if (!options.byFolder || !result?.folders) return ""

    // Définition d'une palette de couleurs professionnelle
    const colors = {
        primary: chalk.hex('#3B82F6'),        // Bleu doux
        secondary: chalk.hex('#10B981'),      // Vert doux
        accent: chalk.hex('#8B5CF6'),         // Violet doux
        
        muted: chalk.hex('#6B7280'),          // Gris moyen
        light: chalk.hex('#9CA3AF'),          // Gris clair
        dark: chalk.hex('#1F2937'),           // Gris foncé
        
        background: chalk.bgHex('#F3F4F6'),   // Fond très clair
        
        serverBar: chalk.hex('#60A5FA'),      // Bleu clair pour serveur
        clientBar: chalk.hex('#34D399'),      // Vert clair pour client
    }

    // En-tête avec style professionnel
    let output = "\n"
    output += colors.background.black.bold(" 📊 FOLDER STATISTICS ") + "\n"
    output += colors.light("─".repeat(50)) + "\n\n"

    // Récupérer et trier les dossiers
    const folders = Object.keys(result.folders)
    folders.sort((a, b) => a.localeCompare(b))

    // Variables pour les totaux
    let totalServer = 0
    let totalClient = 0

    for (const folder of folders) {
        const stats = result.folders[folder]
        const folderTotal = stats.server + stats.client
        
        // Ajouter aux totaux globaux
        totalServer += stats.server
        totalClient += stats.client

        // Calculer les pourcentages
        const serverPercentage = folderTotal > 0 
            ? Math.round((stats.server / folderTotal) * 100) 
            : 0
        const clientPercentage = folderTotal > 0 
            ? Math.round((stats.client / folderTotal) * 100) 
            : 0

        // Barre de progression avec protection contre l'arrondi
        const barLength = 20
        
        // CORRECTION : Calcul sécurisé des longueurs de barre
        let serverBarLength = Math.round((serverPercentage / 100) * barLength)
        let clientBarLength = Math.round((clientPercentage / 100) * barLength)
        
        // Protection contre les valeurs négatives
        serverBarLength = Math.max(0, serverBarLength)
        clientBarLength = Math.max(0, clientBarLength)
        
        // Protection contre la somme > barLength (problème d'arrondi)
        const totalBarLength = serverBarLength + clientBarLength
        if (totalBarLength > barLength) {
            // Ajuster proportionnellement
            serverBarLength = Math.round(serverBarLength * (barLength / totalBarLength))
            clientBarLength = barLength - serverBarLength
        }
        
        // Dernière vérification de sécurité
        serverBarLength = Math.max(0, Math.min(serverBarLength, barLength))
        clientBarLength = Math.max(0, Math.min(clientBarLength, barLength - serverBarLength))
        
        const serverBar = '█'.repeat(serverBarLength)
        const clientBar = '▓'.repeat(clientBarLength)
        const emptyBar = '░'.repeat(Math.max(0, barLength - serverBarLength - clientBarLength))

        // Afficher le nom du dossier
        output += colors.primary.bold(`📁 ${folder || '(root)'}\n`)
        
        // Barre de progression
        output += colors.light("  ┌─") + "─".repeat(barLength) + colors.light("─┐\n")
        output += `  │${colors.serverBar(serverBar)}${colors.clientBar(clientBar)}${emptyBar}│\n`
        output += colors.light("  └─") + "─".repeat(barLength) + colors.light("─┘\n")
        
        // Détails des statistiques
        output += colors.light("  ├─") + "─".repeat(25) + colors.light("─┤\n")
        output += `  │ ${colors.primary("● Server")}: ${colors.primary.bold(stats.server.toString().padEnd(4))} `
        output += `${colors.muted("(" + serverPercentage + "%)").padEnd(7)} `
        output += `${colors.secondary("● Client")}: ${colors.secondary.bold(stats.client.toString().padEnd(4))} `
        output += `${colors.muted("(" + clientPercentage + "%)")} │\n`
        output += colors.light("  └─") + "─".repeat(25) + colors.light("─┘\n")
        
        // Total du dossier
        output += `  ${colors.dark.bold("Total:")} ${colors.primary.bold(folderTotal.toString())} files\n`
        
        // Séparateur entre les dossiers (sauf pour le dernier)
        if (folder !== folders[folders.length - 1]) {
            output += colors.light("  " + "─".repeat(45)) + "\n\n"
        }
    }

    // Pied de page avec résumé global
    output += "\n" + colors.light("─".repeat(50)) + "\n"
    
    const globalTotal = totalServer + totalClient
    const serverGlobalPercentage = globalTotal > 0 
        ? Math.round((totalServer / globalTotal) * 100) 
        : 0
    const clientGlobalPercentage = globalTotal > 0 
        ? Math.round((totalClient / globalTotal) * 100) 
        : 0

    output += colors.background.black.bold(" 📈 SUMMARY ") + "\n\n"
    
    // Barre de progression globale avec les mêmes protections
    const globalBarLength = 30
    
    let globalServerBarLength = Math.round((serverGlobalPercentage / 100) * globalBarLength)
    let globalClientBarLength = Math.round((clientGlobalPercentage / 100) * globalBarLength)
    
    // Protections pour la barre globale
    globalServerBarLength = Math.max(0, globalServerBarLength)
    globalClientBarLength = Math.max(0, globalClientBarLength)
    
    const globalTotalBarLength = globalServerBarLength + globalClientBarLength
    if (globalTotalBarLength > globalBarLength) {
        globalServerBarLength = Math.round(globalServerBarLength * (globalBarLength / globalTotalBarLength))
        globalClientBarLength = globalBarLength - globalServerBarLength
    }
    
    globalServerBarLength = Math.max(0, Math.min(globalServerBarLength, globalBarLength))
    globalClientBarLength = Math.max(0, Math.min(globalClientBarLength, globalBarLength - globalServerBarLength))
    
    const globalServerBar = '█'.repeat(globalServerBarLength)
    const globalClientBar = '▓'.repeat(globalClientBarLength)
    const globalEmptyBar = '░'.repeat(Math.max(0, globalBarLength - globalServerBarLength - globalClientBarLength))
    
    output += ` ${colors.primary("Server")} ${colors.serverBar(globalServerBar)}${colors.clientBar(globalClientBar)}${globalEmptyBar} `
    output += colors.muted(`${serverGlobalPercentage}% / ${clientGlobalPercentage}%`) + "\n\n"
    
    // Totaux détaillés
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