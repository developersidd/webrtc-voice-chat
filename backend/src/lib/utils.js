import path from "path";
import { fileURLToPath } from "url";

const getDirName = (moduleUrl) => {
  const fileName = fileURLToPath(moduleUrl);
  return path.dirname(fileName);
};

export { getDirName };
