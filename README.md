<p align="center">
  <img src="https://raw.githubusercontent.com/Young-power/next-mahine-rsc-inspector/main/public/assets/logo.jpeg" width="300" alt="Next Mahine RSC Inspector Logo" />
</p>

<h1 align="center">Next Mahine RSC Inspector</h1>

<p align="center">
  <strong>Professional analysis tool for Next.js React Server Components architecture</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/next-mahine-rsc-inspector?style=for-the-badge&logo=npm&color=blue" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/next-mahine-rsc-inspector?style=for-the-badge&logo=npm&color=green" alt="npm downloads" />
  <img src="https://img.shields.io/npm/l/next-mahine-rsc-inspector?style=for-the-badge&logo=opensourceinitiative&color=orange" alt="license" />
  <img src="https://img.shields.io/github/stars/Young-power/next-mahine-rsc-inspector?style=for-the-badge&logo=github&color=yellow" alt="GitHub stars" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-cli-usage">CLI Usage</a> •
  <a href="#-library-api">Library API</a> •
  <a href="#-examples">Examples</a> •
  <a href="#-license">License</a>
</p>

---

## 🚀 Overview

**Next Mahine RSC Inspector** is a comprehensive analysis tool designed to help developers understand and optimize their Next.js App Router architecture. It provides detailed insights into React Server Components (RSC) usage, component distribution, and performance patterns.

Whether you're auditing a codebase, optimizing performance, or ensuring best practices, this tool gives you the visibility you need into your Next.js application's architecture.

## ✨ Features

### 📊 **Comprehensive Analysis**
- ✅ **Automatic detection** of `app/` or `src/` directories
- ✅ **Accurate classification** of Server vs Client Components
- ✅ **Folder-by-folder statistics** for detailed insights
- ✅ **Percentage ratios** for quick assessment

### 🛠️ **Multiple Output Formats**
- ✅ **Visual CLI reports** with progress bars and colored output
- ✅ **JSON export** for integration with other tools
- ✅ **File output** for saving reports
- ✅ **Programmatic API** for custom integrations

### 🔧 **Developer Experience**
- ✅ **Zero-configuration** - works out of the box
- ✅ **TypeScript support** with full type definitions
- ✅ **Fast execution** with minimal dependencies
- ✅ **Cross-platform** support (Windows, macOS, Linux)

---

## 📦 Quick Start

### Method 1: Quick Run (No Installation)
```bash
npx next-mahine-rsc-inspector


Method 2: Local Installation
npm install next-mahine-rsc-inspector --save-dev
npx next-mahine-rsc-inspector


Method 3: Global Installation
npm install -g next-mahine-rsc-inspector
next-mahine-rsc-inspector



JSON Output

# Export as JSON to console
npx next-mahine-rsc-inspector --json

# Save JSON report to file
npx next-mahine-rsc-inspector --json -o report.json

# Combine folder stats with JSON
npx next-mahine-rsc-inspector --by-folder 


Output Examples
Visual Report

<p align="center"> <img src="https://raw.githubusercontent.com/Young-power/next-mahine-rsc-inspector/main/public/assets/output.png" width="800" alt="CLI Output Example" /> <br> <em>Interactive CLI with progress visualization</em> </p>

{
  "projectName": "my-nextjs-app",
  "projectRoot": "/path/to/project",
  "appDir": "/path/to/project/src",
  "folders": {
    "app": { "server": 5, "client": 2 },
    "components": { "server": 3, "client": 12 },
    "components/ui": { "server": 1, "client": 8 }
  },
  "total": 31,
  "client": 22,
  "server": 9,
  "ratioServer": 29,
  "ratioClient": 71
}




MIT License

Copyright (c) 2026 Mahaman Mahine Kamagaté
created: 26/01/2026
