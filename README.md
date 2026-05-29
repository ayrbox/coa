# Chopper on Attack

## History

This project holds a special place in my journey as a developer. Originally created in **Visual Basic** back in **2004**, it was one of my first game project when I was a young hire for a startup. At the time, I was practically learning programming on the job, and this game was side venture in the evening.

I rediscovered the project while going through old backups and decided to breathe new life into it.

## The Web Conversion

Using **Gemini CLI (AI)**, I have converted the original Visual Basic game into a modern web application. The goal of this conversion was to:

- **Preserve the original assets:** All the bitmaps and sprites from 2004 have been kept (converted to PNG for web compatibility).
- **Faithful Logic:** The game mechanics and logic were ported by referencing the original Visual Basic source code (`.vbp`, `.frm`, and `.bas` files).

The result is a playable version of a 20-year-old personal milestone, now running in any modern browser.

## Tech Stack

- **Original (2004):** Visual Basic 6
- **Web (2026):** JavaScript (ES6+), HTML5 Canvas, Vite

## Project Structure

- `/vb`: The original Visual Basic source code and assets.
- `/web`: The modern web implementation.

## How to Run the Web Version

To play the game locally, follow these steps:

1. **Navigate to the web folder:**

   ```bash
   cd web
   ```

2. **Install dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed.

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Vite will provide a local URL (usually `http://localhost:5173`). Open it to start the game!

## Controls

- **Arrow Keys:** Move the Chopper
- **Spacebar:** Fire bullets
- **Enter:** Start Game / Restart
- **Escape:** Return to Title Screen

---

_A nostalgic trip from 2004 to the modern web._
