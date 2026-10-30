import { defineAgent } from "eve";

/**
 * Root agent runtime configuration.
 *
 * @remarks
 * Sets the model for the marketing team lead; the rest of the agent's surface (channels,
 * connections, tools, skills, subagents) is discovered from the filesystem under `agent/`. This
 * agent routes work to specialists rather than producing deliverables itself, so it is the first
 * place to try a cheaper model tier if cost matters more than routing quality. Conversation history
 * is compacted once it reaches 90% of the context window.
 */
export default defineAgent({
  compaction: { threshold: 0.9 },
  model: "anthropic/claude-opus-5",
});
