# Choper on Attack 01

A side-scrolling helicopter shooter game, originally developed in Visual Basic 6 (VB6) and recently ported to a modern web application.

## Project Overview

This project consists of two main parts:
1.  **Legacy VB6 Game:** The original game source code, assets, and project files. It uses Win32 GDI calls (`BitBlt`) for graphics rendering and embedded resources in `.frx` files.
2.  **Modern Web Port:** A JavaScript-based implementation located in the `chopper-web/` directory. It uses the HTML5 Canvas API for rendering and Vite as a build tool.

### Technologies
- **Legacy:** Visual Basic 6, Win32 API (GDI, Multimedia).
- **Web:** JavaScript (ES6+), HTML5 Canvas, Vite, CSS.
- **Tools:** Python (Pillow) for asset conversion.

## Project Structure

- `COA.VBP`: Visual Basic 6 project file.
- `frmSky.frm`: Main game logic and UI for the VB6 version.
- `modDeclaration.bas`: Win32 API declarations for graphics, sound, and system functions.
- `chopper-web/`: The modern web port.
    - `src/`: Source code for the web version.
    - `public/assets/`: Converted game assets (PNG/JPG).
    - `main.js`: Main game loop, input handling, and rendering logic for the web.
- `convert_sprites.py`: A utility script to convert original `.bmp` and `Mask*.bmp` files into transparent `.png` files for the web version.
- `Explode/`, `Big Explode/`: Directories containing explosion animation frames.
- `Code/`: Exported source code and documentation snippets.

## Building and Running

### Web Version (`chopper-web/`)
The web version is managed with npm and Vite.

```bash
cd chopper-web
npm install   # Install dependencies
npm run dev   # Start development server
npm run build # Build for production
```

### Asset Conversion
If you modify the original `.bmp` assets, you can re-run the conversion script:

```bash
python3 convert_sprites.py
```
*Note: Requires `Pillow` (PIL) library.*

### VB6 Version
Requires a Visual Basic 6.0 development environment on Windows. Open `COA.VBP` to load the project.

## Gameplay & Controls

### Web Version
- **Arrow Keys:** Move the helicopter.
- **Space:** Shoot bullets.
- **Enter:** Start the game from the title or game over screen.
- **Esc:** Return to the title screen from the game over screen.

### Objective
Navigate your helicopter and shoot down as many attacking enemy helicopters as possible without colliding with them.

## Development Conventions

- **Assets:** Original assets are BMPs with separate mask files. For the web port, always use the `convert_sprites.py` script to generate the final PNGs in `chopper-web/public/assets/`.
- **Game Logic:** The web port (`main.js`) aims to replicate the timing and behavior of the original VB6 timers and collision detection.
- **State Management:** The game uses a simple state machine (`title`, `playing`, `gameover`) to manage transitions.
