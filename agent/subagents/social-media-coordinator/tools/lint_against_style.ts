import { lintAgainstStyleTool } from "#lib/content/tools.js";
import blueskyBannedWords from "../skills/bluesky-style/references/banned-words.json" with {
  type: "json",
};
import linkedinBannedWords from "../skills/linkedin-style/references/banned-words.json" with {
  type: "json",
};
import mastodonBannedWords from "../skills/mastodon-style/references/banned-words.json" with {
  type: "json",
};
import threadsBannedWords from "../skills/threads-style/references/banned-words.json" with {
  type: "json",
};
import xBannedWords from "../skills/x-style/references/banned-words.json" with {
  type: "json",
};

export default lintAgainstStyleTool(
  ["x", "linkedin", "threads", "bluesky", "mastodon"],
  {
    bluesky: blueskyBannedWords,
    linkedin: linkedinBannedWords,
    mastodon: mastodonBannedWords,
    threads: threadsBannedWords,
    x: xBannedWords,
  }
);
