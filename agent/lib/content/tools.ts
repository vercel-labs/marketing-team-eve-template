import { defineTool } from "eve/tools";
import { z } from "zod";
import {
  findBannedWords,
  MAX_DRAFT_LENGTH,
  parseBannedWords,
} from "#lib/content/config.js";

/**
 * The style-lint tool.
 *
 * @remarks
 * eve resolves an agent's tools from its own `tools/` directory and subagents inherit nothing, so
 * the three agents that lint a draft call this factory from a one-line file in their own `tools/`.
 *
 * Input bounds and the matching logic live in `config.ts`; this module is the tool interface over
 * them.
 */

/**
 * Tool that checks a draft against the active surface's banned-words list.
 *
 * @remarks
 * Each agent passes the `references/banned-words.json` list of every `<surface>-style` skill it
 * authors, imported from the skill directory, so each style skill stays the source of truth for its
 * own surface. The keys become the tool's `surface` enum, which means the list a call checks
 * against comes from a fixed map and can never be influenced by the caller. A list that fails
 * validation is treated as "no banned words" rather than failing the check.
 *
 * The lists are validated once, when the tool is built, rather than on every call.
 *
 * @param bannedWordsBySurface - Each surface's parsed `banned-words.json`, keyed by surface.
 * @returns The configured tool.
 * @throws When no surface is passed, since the tool would have nothing to check against.
 */
export const lintAgainstStyleTool = <const Surface extends string>(
  bannedWordsBySurface: Readonly<Record<Surface, unknown>>
) => {
  const surfaces = Object.keys(bannedWordsBySurface) as Surface[];
  const [first, ...rest] = surfaces;
  if (first === undefined) {
    throw new Error("lintAgainstStyleTool needs at least one surface.");
  }
  const bannedBySurface = new Map(
    surfaces.map((surface) => [
      surface,
      parseBannedWords(bannedWordsBySurface[surface]),
    ])
  );

  return defineTool({
    description:
      "Check a draft against the target surface's banned-words list and return every violation. " +
      "Run it on each draft before proposing that draft, once per surface when a piece targets " +
      "several, and again after a rewrite. A clean result is a floor rather than a verdict: it " +
      "means no banned words, not that the draft is good, so the surface's style skill still " +
      "governs.",
    /**
     * Scan `text` for any banned word defined by the surface's style skill.
     *
     * @param input - Validated tool input.
     * @param input.surface - Content surface whose style skill supplies the banned-words list.
     * @param input.text - Draft text to scan.
     * @returns `ok` (true when no banned words are present) and human-readable `violations`.
     */
    execute({ surface, text }) {
      const hits = findBannedWords(text, bannedBySurface.get(surface) ?? []);
      return {
        ok: hits.length === 0,
        violations: hits.map(
          (word) => `Avoid "${word}" per the ${surface} style guide.`
        ),
      };
    },
    inputSchema: z.object({
      surface: z
        .enum([first, ...rest])
        .describe(
          "The surface this draft is written for. Selects which style skill's banned-words list to check against."
        ),
      text: z
        .string()
        .min(1)
        .max(MAX_DRAFT_LENGTH)
        .describe(
          "The full draft text to scan, including every post of a thread."
        ),
    }),
    outputSchema: z.object({
      ok: z
        .boolean()
        .describe("True when the draft contains none of the banned words."),
      violations: z
        .array(z.string())
        .describe(
          "One message per banned word found, naming the word and the surface. Empty when ok is true."
        ),
    }),
  });
};
