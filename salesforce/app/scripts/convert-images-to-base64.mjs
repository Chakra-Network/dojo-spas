import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command-line arguments
const args = process.argv.slice(2);
const isGifMode = args.includes("--gifs");
const isImageMode = args.includes("--images") || !isGifMode; // Default to images if no flag

// Configuration based on mode
const config = isGifMode
  ? {
      inputDir: path.join(__dirname, "../public/dojos/salesforce/gifs"),
      outputDir: path.join(__dirname, "../src/components/resources/gifs"),
      extension: ".gif",
      mimeType: "image/gif",
      suffix: "_GIF",
      typeName: "GIF",
    }
  : {
      inputDir: path.join(__dirname, "../public/dojos/salesforce/images"),
      outputDir: path.join(__dirname, "../src/components/resources/images"),
      extension: ".png",
      mimeType: "image/png",
      suffix: "_IMAGE",
      typeName: "PNG",
    };

// Convert filename to constant name (e.g., "logo-cosmos.png" -> "LOGO_COSMOS_IMAGE")
function toConstantName(filename, suffix) {
  return (
    filename
      .replace(/\.[^.]+$/, "") // Remove extension
      .replace(/[-\s]/g, "_") // Replace hyphens and spaces with underscores
      .toUpperCase() + suffix
  );
}

// Convert filename to file name (e.g., "logo-cosmos.png" -> "logo-cosmos")
function toFileName(filename) {
  return filename.replace(/\.[^.]+$/, ""); // Remove extension
}

async function convertImagesToBase64() {
  try {
    console.log(`\n🔄 Running in ${config.typeName} mode...`);
    console.log(`📁 Input: ${config.inputDir}`);
    console.log(`📁 Output: ${config.outputDir}\n`);

    // Check if input directory exists
    if (!fs.existsSync(config.inputDir)) {
      console.log(`⚠️  Input directory does not exist: ${config.inputDir}`);
      console.log(`No ${config.typeName} files to convert.`);
      return;
    }

    // Read all files from input directory
    const files = fs.readdirSync(config.inputDir);

    // Filter files by extension
    const imageFiles = files.filter((file) =>
      file.toLowerCase().endsWith(config.extension)
    );

    console.log(
      `Found ${imageFiles.length} ${config.typeName} files to convert...`
    );

    if (imageFiles.length === 0) {
      console.log(`No ${config.typeName} files to convert.`);
      return;
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir, { recursive: true });
    }

    const exports = [];

    // Generate individual files for each image
    for (const file of imageFiles.sort()) {
      const filePath = path.join(config.inputDir, file);
      const imageBuffer = fs.readFileSync(filePath);
      const base64 = imageBuffer.toString("base64");
      const constantName = toConstantName(file, config.suffix);
      const fileName = toFileName(file);

      // Create individual file content
      const fileContent = `// Auto-generated file. Do not edit manually.
// Generated on ${new Date().toISOString()}
// Source: ${file}

export const ${constantName} = "data:${config.mimeType};base64,${base64}";
`;

      // Write individual file
      const outputFile = path.join(config.outputDir, `${fileName}.ts`);
      fs.writeFileSync(outputFile, fileContent, "utf-8");

      // Add to exports array for barrel file
      exports.push({ fileName, constantName });

      console.log(`✓ Converted: ${file} -> ${fileName}.ts (${constantName})`);
    }

    // Generate barrel export file (index.ts) based on ALL existing .ts files
    // This ensures we don't lose existing exports when converting new images
    const allTsFiles = fs
      .readdirSync(config.outputDir)
      .filter((file) => file.endsWith(".ts") && file !== "index.ts")
      .sort();

    let indexContent = `// Barrel export file for all ${config.typeName.toLowerCase()}s\n`;

    for (const file of allTsFiles) {
      const fileName = file.replace(".ts", "");
      const constantName = toConstantName(
        fileName + config.extension,
        config.suffix
      );
      indexContent += `export { ${constantName} } from "./${fileName}";\n`;
    }

    const indexFile = path.join(config.outputDir, "index.ts");
    fs.writeFileSync(indexFile, indexContent, "utf-8");

    console.log(
      `\n✅ Successfully generated ${imageFiles.length} ${config.typeName} files`
    );
    console.log(`✅ Successfully generated: ${indexFile}`);
  } catch (error) {
    console.error(
      `❌ Error converting ${config.typeName.toLowerCase()}s:`,
      error
    );
    process.exit(1);
  }
}

convertImagesToBase64();
