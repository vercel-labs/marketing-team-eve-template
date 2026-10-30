import { defineAgent } from "eve";

// Subagent: Product Marketer

/**
 * Subagent runtime configuration.
 *
 * @remarks
 * Sets the description the root routes on and the model. The rest of the agent's surface (tools,
 * skills, nested subagents) is discovered from the filesystem. Conversation history is compacted
 * once it reaches 90% of the context window.
 *
 * This is the only specialist that treats the brand context document as its deliverable rather than
 * as input, so it carries `save_brand_context` alongside the read tool. That write overwrites the
 * document for the whole team, with no approval gate and no previous version to recover, which is
 * why the interviewing discipline in `instructions.md` matters: agreeing the document with the user
 * before saving is the only review it gets.
 *
 * A positioning document is short by design, and length here is usually a symptom of hedging rather
 * than thoroughness, so the brevity discipline lives in `instructions.md`.
 */
export default defineAgent({
  compaction: { threshold: 0.9 },
  description:
    "Work out and write down what the product is, who it's for, and why anyone would pick it: " +
    "positioning, the competitive alternatives, the ideal customer, the message hierarchy, value " +
    "propositions per audience, objection handling, and the proof behind each claim. Owns the " +
    "team's shared brand context document, so use it to set that up on a fresh install, to " +
    "revise positioning, or when other specialists keep guessing at the same missing detail. " +
    "Interviews the user and researches the competitive set rather than inventing an answer, and " +
    "writes claims that can be checked. Does not draft posts, pages, or campaigns.",
  model: "anthropic/claude-opus-5",
});
