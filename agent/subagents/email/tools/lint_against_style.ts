import { lintAgainstStyleTool } from "#lib/content/tools.js";
import bannedWords from "../skills/email-style/references/banned-words.json" with {
  type: "json",
};

export default lintAgainstStyleTool(["email"], { email: bannedWords });
