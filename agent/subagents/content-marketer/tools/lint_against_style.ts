import { lintAgainstStyleTool } from "#lib/content/tools.js";
import bannedWords from "../skills/blog-style/references/banned-words.json" with {
  type: "json",
};

export default lintAgainstStyleTool(["blog"], { blog: bannedWords });
