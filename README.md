# EmoCare-code

An open-source Electron application with Vue, built using **electron-vite** for a fast and modern development experience. You can clone this repository and start developing immediately.

This is the codebase for [EmoCare](https://github.com/chronoscop/EmoCare).

------

## 📂 Repository Usage

This repository is **open-source** and ready to use. To get started:
1. **Install Node.js (v18+ or v20+)**  
   Ensure you have **Node.js 18+** installed. You can download it from:  [https://nodejs.org](https://nodejs.org)  
   
   > ✅ electron-vite requires Node.js version 18+, 20+ and Vite version 4.0+

1. Clone the repository:

   ```bash
   git clone https://github.com/chronoscop/EmoCare.git
   ```

2. Navigate to the project folder:

   ```bash
   cd EmoCare
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

> ✅ You can now develop, customize, and contribute to this project directly!

### Build Production Versions

```bash
# For Windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```

> ⚠️ By default, electron-vite outputs to `./out`. Ensure your `package.json` points `"main"` to `./out/main/index.js`, otherwise the app won't launch.
>
> Example:
>
> ```json
> {
>   "name": "emo-care",
>   "version": "1.0.0",
>   "main": "./out/main/index.js"
> }
> ```
>
> 📦 The pre-built version for Windows is available at: [Releases v1.0 ](https://github.com/chronoscop/EmoCare/releases/tag/v1.0)

---

## 🛠️ Recommended Development Environment

We recommend using **Visual Studio Code** for development, with the following extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) — code linting
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) — code formatting
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) — Vue 3 language support (including `<script setup>` and TypeScript)

> 💡 VS Code is an open-source AI code editor that supports local/remote code indexing, smart completions, Agent mode for automated tasks, and more. It's ideal for both individual developers and teams.

---

## 🧩 Project Structure (Based on electron-vite)

The project includes three core configuration entries:

- `src/renderer/src/views` — four main pages function are write at here.
- `src/main` — Electron main process logic.
- `src/preload` — Preload script to safely expose Node.js APIs to the renderer.
- `src/renderer` — Vue renderer application (frontend UI)

------

## 🚀 Quick Start (For New Projects)

This project uses **electron-vite** as its build tool. If you'd like to create your own Electron + Vue project from scratch, you can use the official scaffold:

```bash
npm create @quick-start/electron@latest
```

Follow the prompts to select:

- Project name: `your project name`
- Select a framework: `Vue`
- Add TypeScript? `Yes/No` (recommended)
- Add Electron updater plugin? `Yes/No` (optional)
- Enable Electron download mirror proxy? `Yes/No` (optional)

> ✅ This setup supports JavaScript / TypeScript and frameworks like Vue, React, Svelte.
> Documentation: [electron-vite guide ](https://electron-vite.org/guide/)

------

## 📚 About

This project uses **electron-vite** as its build tool. For more information, visit:

- [electron-vite guide](https://electron-vite.org/guide/)

------

## 📄 License

Apache-2.0 License — see `LICENSE` file.

------
