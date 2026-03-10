// scripts/generate-licenses-md.js
// Generates a Markdown file listing all dependency licenses using license-checker

import fs from "fs";
import licenseChecker from "license-checker";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputFile = path.join(__dirname, "..", "..", "DEPENDENCIES-LICENSES.md");

licenseChecker.init(
  {
    start: path.join(__dirname, ".."),
    production: true,
  },
  function (err, packages) {
    if (err) {
      console.error("Error generating licenses:", err);
      process.exit(1);
    }

    let md = "# Third-Party Licenses\n\n";
    md +=
      "This file lists the licenses of dependencies used in this project.\n\n";

    // Get the app's own name from package.json to ignore it
    const appPkg = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"),
    );
    const appName = appPkg.name;

    Object.keys(packages).forEach((pkg) => {
      // Ignore the app's own package
      if (pkg.startsWith(appName + "@")) return;
      const info = packages[pkg];
      md += `- **${pkg}**\n`;
      if (info.publisher) {
        md += `  - Publisher: ${info.publisher}\n`;
      }
      md += `  - License: ${info.licenses}\n`;
      md += `  - Repository: ${info.repository || "N/A"}\n`;
      md += `  - License File: ${info.licenseFile ? info.licenseFile.replace(process.cwd(), "") : "N/A"}\n\n`;
    });

    fs.writeFileSync(outputFile, md);
    console.log("DEPENDENCIES-LICENSES.md generated.");
  },
);
