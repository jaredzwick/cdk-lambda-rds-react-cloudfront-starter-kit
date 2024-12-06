import * as fs from "fs";
import * as path from "path";

export const computeDirHash = (dir: string): string => {
  const files = fs
    .readdirSync(dir)
    .filter((file) => fs.statSync(path.join(dir, file)).isFile());
  // Compute hash or process files
  return files.map((file) => fs.readFileSync(path.join(dir, file))).join();
};
