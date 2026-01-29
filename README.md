<p align="center">
  <img src="https://raw.githubusercontent.com/Young-power/next-mahine-rsc-inspector/main/public/assets/logo.jpeg" width="200" alt="Next Mahine RSC Inspector Logo" />
</p>

<h1 align="center">🚀 next-mahine-rsc-inspector</h1>

<p align="center">
  <img src="https://img.shields.io/npm/v/next-mahine-rsc-inspector" />
  <img src="https://img.shields.io/npm/dm/next-mahine-rsc-inspector" />
  <img src="https://img.shields.io/npm/l/next-mahine-rsc-inspector" />
  <img src="https://img.shields.io/github/stars/Young-power/next-mahine-rsc-inspector?style=social" />
</p>

<p align="center">
  Inspect and analyze your Next.js App Router <b>React Server Components</b> architecture.
</p>

---

## ✨ What is this?

**next-mahine-rsc-inspector** is a CLI and a JavaScript/TypeScript library to analyze how many:

- 🧱 **Server Components**
- 🧩 **Client Components**

your Next.js project uses, and export the result as JSON.

---

## ✨ Features

- ✅ Detects `app/` or `src/app`
- ✅ Counts Server vs Client Components
- ✅ Shows global statistics
- ✅ Exports report as JSON
- ✅ Can save report to a file
- ✅ Works as CLI or as a library
- ✅ Works with npm, yarn and pnpm

---

## 📦 Installation & Usage

### ▶️ Use without installing (recommended)

```bash
npx next-mahine-rsc-inspector

-------------------------------------------------
📥 Install with npm
npm install next-mahine-rsc-inspector

-------------------------------------------------
Run:

npx next-mahine-rsc-inspector


Or globally:

npm install -g next-mahine-rsc-inspector
next-mahine-rsc-inspector


-----------------------------------------------
📄 Export JSON

Print JSON to console:

next-mahine-rsc-inspector --json


Save report to a file:

next-mahine-rsc-inspector -o report.json


---------------------------------------------

📦 Use as a library

You can also use it in your own scripts or tools:

import { scanProject } from "next-mahine-rsc-inspector"

const result = await scanProject(process.cwd())
console.log(result)

-----------------------------------------------

🧠 Available API

import {
  scanProject,
  analyzeFile,
  computeStats
} from "next-mahine-rsc-inspector"


scanProject(rootPath: string) → Analyze a full Next.js project

analyzeFile(filePath: string) → Analyze a single file

computeStats(results) → Compute statistics from results






Example output:


🔍 Scanning project...
📁 Found app directory
📄 Total files: 190
🧩 Client Components: 88
🧱 Server Components: 102
📊 Ratio: 54% server
📊 Ratio: 46% client


<p align="center">
  <img src="https://raw.githubusercontent.com/Young-power/next-mahine-rsc-inspector/main/public/assets/logo.jpeg" width="200" alt="Next Mahine RSC Inspector Logo" />
</p>

<h1 align="center">🚀 next-mahine-rsc-inspector</h1>

<p align="center">
  <img src="https://img.shields.io/npm/v/next-mahine-rsc-inspector" />
  <img src="https://img.shields.io/npm/dm/next-mahine-rsc-inspector" />
  <img src="https://img.shields.io/npm/l/next-mahine-rsc-inspector" />
  <img src="https://img.shields.io/github/stars/Young-power/next-mahine-rsc-inspector?style=social" />
</p>

<p align="center">
  Inspect and analyze your Next.js App Router <b>React Server Components</b> architecture.
</p>

---

## ✨ What is this?

**next-mahine-rsc-inspector** is a CLI and a JavaScript/TypeScript library to analyze how many:

- 🧱 **Server Components**
- 🧩 **Client Components**

your Next.js project uses, and export the result as JSON.

---

## ✨ Features

- ✅ Detects `app/` or `src/app`
- ✅ Counts Server vs Client Components
- ✅ Shows global statistics
- ✅ Exports report as JSON
- ✅ Can save report to a file
- ✅ Works as CLI or as a library
- ✅ Works with npm, yarn and pnpm

---

## 📦 Installation & Usage

### ▶️ Use without installing (recommended)

```bash
npx next-mahine-rsc-inspector

-------------------------------------------------
📥 Install with npm
npm install next-mahine-rsc-inspector

-------------------------------------------------
Run:

npx next-mahine-rsc-inspector


Or globally:

npm install -g next-mahine-rsc-inspector
next-mahine-rsc-inspector


-----------------------------------------------
📄 Export JSON

Print JSON to console:

next-mahine-rsc-inspector --json


Save report to a file:

next-mahine-rsc-inspector -o report.json


---------------------------------------------

📦 Use as a library

You can also use it in your own scripts or tools:

import { scanProject } from "next-mahine-rsc-inspector"

const result = await scanProject(process.cwd())
console.log(result)

-----------------------------------------------

🧠 Available API

import {
  scanProject,
  analyzeFile,
  computeStats
} from "next-mahine-rsc-inspector"


scanProject(rootPath: string) → Analyze a full Next.js project

analyzeFile(filePath: string) → Analyze a single file

computeStats(results) → Compute statistics from results






Example output:


🔍 Scanning project...
📁 Found app directory
📄 Total files: 190
🧩 Client Components: 88
🧱 Server Components: 102
📊 Ratio: 54% server
📊 Ratio: 46% client



MIT License

Copyright (c) 2026 Mahaman Mahine Kamagaté
created: 26/01/2026

