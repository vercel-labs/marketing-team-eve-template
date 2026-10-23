import { defineSandbox } from "eve/sandbox";
import { VercelSandbox } from "eve/sandbox/vercel";

/**
 * The Vercel Sandbox environment this subagent's sessions open.
 *
 * @remarks
 * Exported because `eve build` prepares the environment, including this agent's skill files, before
 * any session exists.
 */
export const environment = VercelSandbox.environment();

/**
 * Subagent sandbox configuration.
 *
 * @remarks
 * Subagents inherit nothing from the root agent: an absent `sandbox.ts` falls back to the
 * framework default rather than the root's choice. This pins the same hosted Vercel Sandbox
 * provider the root uses, which is what makes each skill's `references/` files readable — static
 * `SKILL.md` instructions load without a sandbox, but supporting files are materialized into one.
 * Every per-surface style skill keeps its specs and banned-words list in `references/`.
 *
 * It opens its own sandbox rather than sharing the root's with `defineParentSandbox()`, because a
 * subagent that inherits its parent's sandbox cannot declare skill files of its own.
 *
 * @see {@link https://vercel.com/docs/sandbox | Vercel Sandbox}
 */
export default defineSandbox(() => environment.open());
