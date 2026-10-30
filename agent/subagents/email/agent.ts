import { defineAgent } from "eve";

// Subagent: Email

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
    "Own email as a channel: take copy that already exists and make it work as email, then build " +
    "and run it in Resend. Reviews a draft for email fit (subject and preview text, one call to " +
    "action, scannable structure, a plain text version, link and image hygiene), then builds the " +
    "template or broadcast, picks the verified sending address, targets the segment, and reports " +
    "on what was delivered and opened. Sending a broadcast or an email pauses for approval. Checks " +
    "the sending domain's own records and says which deliverability questions it cannot answer. " +
    "Route long-form prose to the content marketer first and pass what came back to this agent. " +
    "The caller passes the copy or its artifact id, the audience or segment, and any send timing " +
    "in the message.",
  model: "anthropic/claude-opus-5",
});
