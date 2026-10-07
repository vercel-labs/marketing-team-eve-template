import { defineSandbox } from "eve/sandbox";
import { VercelSandbox } from "eve/sandbox/vercel";

/**
 * Subagent sandbox configuration.
 *
 * @remarks
 * Subagents inherit nothing from the root agent, so each sandbox selects the same hosted Vercel
 * Sandbox environment as the root. This lets the agent read its skill reference files in both
 * development and production.
 *
 * @see {@link https://vercel.com/docs/sandbox | Vercel Sandbox}
 */
export const environment = VercelSandbox.environment();

export default defineSandbox(() => environment.open());
