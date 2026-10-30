import { defineAgent } from "eve";

// Subagent: SEO

/**
 * Subagent runtime configuration.
 *
 * @remarks
 * Sets the description the root routes on and the model. The rest of the agent's surface (tools,
 * skills, nested subagents) is discovered from the filesystem. Conversation history is compacted
 * once it reaches 90% of the context window.
 *
 * The description is deliberately explicit about the evidence boundary. This agent reads pages with
 * `web_fetch`, which cannot execute JavaScript or reach Search Console, so a crawl-level or
 * Core-Web-Vitals finding is outside what it can verify. Naming that in the description keeps the
 * root from routing an ask here that it can only answer by guessing, and the `seo-audit` skill
 * repeats the boundary where the model acts on it.
 */
export default defineAgent({
  compaction: { threshold: 0.9 },
  description:
    "Plan and review organic search work: keyword and topic strategy, on-page review of a URL, " +
    "site architecture and internal linking, URL structure, JSON-LD schema markup, and " +
    "programmatic page templates at scale. Use when someone asks why a page isn't ranking, what " +
    "pages they should build, for a review of a page's SEO, or for the schema markup on a page. " +
    "Also use before a piece is written for search, so the query and the competing pages are " +
    "settled before someone drafts against them. " +
    "Reads pages it is given with web_fetch and researches competitors on the open web, so it " +
    "reports what a " +
    "fetched page shows and says plainly what needs crawler or Search Console access it doesn't " +
    "have. Recommends title tags, meta descriptions, and URL slugs; hand body copy to the content " +
    "marketer. The caller passes the URLs, the target keywords, the audience, and any brand " +
    "context in the message.",
  model: "anthropic/claude-opus-5",
});
