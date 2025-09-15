const rimraf = require("rimraf");

// All paths to clean
const PATHS_TO_CLEAN = [
  // Next.js
  ".next",
  "dist",
  "next-env.d.ts",
  // next-image-export-optimizer
  "public/images/next-image-export-optimizer-hashes.json",
  "public/**/images-optimized",
];

// Clean all paths, handling errors individually
PATHS_TO_CLEAN.forEach((path) => {
  try {
    const isGlob = path.includes("**");

    rimraf.sync(path, { glob: isGlob });
  } catch (error) {
    console.log(error);
  }
});
