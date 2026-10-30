import { defineAgent } from "eve";

// Subagent: Social Media Coordinator

/**
 * Subagent runtime configuration.
 *
 * @remarks
 * Sets the description the parent routes on and the model. The rest of the agent's surface
 * (connections, tools, skills) is discovered from the filesystem. Conversation history is compacted
 * once it reaches 90% of the context window.
 */
export default defineAgent({
  compaction: { threshold: 0.9 },
  description:
    "Run social media work end to end for X, LinkedIn, Threads, Bluesky, and Mastodon: draft " +
    "posts and threads in each platform's voice, adapt one piece across platforms, and manage " +
    "the Typefully queue (read, create, and edit drafts, schedule on request, pull post and " +
    "follower analytics). Researches facts and reviews its own drafts before handing them back. " +
    "The caller passes the brief or source material, the target platforms, and any angle, " +
    "audience, or timing constraints in the message.",
  model: "anthropic/claude-opus-5",
});
