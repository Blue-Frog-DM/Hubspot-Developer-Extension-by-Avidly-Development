# HubSpot Developer Extension

![Chrome Web Store](https://img.shields.io/chrome-web-store/v/PLACEHOLDER.svg?label=Chrome%20Web%20Store)
![License](https://img.shields.io/github/license/Blue-Frog-DM/Hubspot-Developer-Extension-by-Avidly-Development.svg)

> An open‑source Chrome extension that super‑charges HubSpot development — maintained by Avidly Development.

## Table of Contents

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)

  * [URL Tools](#url-tools)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [Code of Conduct](#code-of-conduct)
* [License](#license)

## Features

| Category                    | Highlights                                                                                                        |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Documentation shortcuts** | • CRM API & CMS API<br>• Webhooks & OAuth<br>• HubL reference                                                     |
| **URL tools**               | • Toggle debug mode<br>• Disable cache<br>• Preview/Test mode<br>• Portal simulation                              |
| **Community links**         | • Developer announcements<br>• CMS development tips<br>• CRM customization Q\&A<br>• Workflow automation examples |

## Installation

### From Chrome Web Store (coming soon)

*Not yet published. We'll update this section when the extension is live on the Chrome Web Store.*

### Development Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/Blue-Frog-DM/Hubspot-Developer-Extension-by-Avidly-Development.git
   cd Hubspot-Developer-Extension-by-Avidly-Development
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```
   This will create a `dist` folder with the built extension.

4. Load in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top-right corner
   - Click "Load unpacked" in the top-left
   - Select the `dist` folder from your project directory

The extension icon will appear in your toolbar once loading completes.

### Development Workflow

1. **Making Changes**:
   - All development work should be done in the `src` folder
   - Never modify files in the `dist` folder (they get overwritten)

2. **Building**:
   - After making changes, run `npm run build`
   - This will:
     - Clean the existing `dist` folder
     - Copy updated files from `src` to `dist`

3. **Testing Changes**:
   - After building, go to `chrome://extensions/`
   - Find your extension card
   - Click the refresh icon (🔄)
   - Test your changes in Chrome

4. **Project Structure**:
   ```
   src/               # Source files (development)
   ├── manifest.json  # Extension manifest
   ├── popup.html    # Main interface
   ├── css/         
   ├── js/          
   └── images/       # Icons & assets
   
   dist/              # Built files (generated)
   └── [...]         # Copy of src/ (do not edit)

## Usage

1. Click the HubSpot Developer Extension icon.
2. Navigate between **Docs**, **URL Tools**, and **Community** tabs.
3. Actions that alter the current tab’s URL will automatically reload the page for you.

### URL Tools

| Tool                  | What it does                                          |
| --------------------- | ----------------------------------------------------- |
| **Debug mode**        | Appends `?hsDebug=true`                               |
| **Disable cache**     | Appends `?nocache=true`                               |
| **Preview / Test**    | Quickly switch between `?preview=` and `?test=` modes |
| **Portal simulation** | Temporarily impersonate another portal by ID          |

> **Note:** All URL tools work only on HubSpot domains.

## Project Structure

```
├── src/              # Source files (development)
│   ├── manifest.json # Extension manifest
│   ├── popup.html    # Main interface
│   ├── css/
│   │   └── popup.css
│   ├── js/
│   │   ├── popup.js
│   │   └── content.js
│   └── images/       # Icons & assets
│
└── dist/             # Built files (generated, do not edit)
    └── [...]        # Copy of src/ after build
```

## Contributing

We ❤️ contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow, coding standards, and branch/commit guidelines.

Quick start:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-awesome-feature`.
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/).
4. Push to the branch and open a pull request.

### Assets

Replace the placeholder icons in `src/images` with your own before publishing to the Chrome Web Store.

## Code of Conduct

We are committed to fostering a welcoming community. Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating.

###### Disclaimer

*HubSpot® is a registered trademark of HubSpot, Inc. This project is not affiliated with or endorsed by HubSpot.*

## License

MIT © Avidly Development
