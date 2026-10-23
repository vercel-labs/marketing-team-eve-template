import { defineSandbox } from "eve/sandbox";
import { VercelSandbox } from "eve/sandbox/vercel";

/**
 * The Vercel Sandbox environment this agent's sessions open.
 *
 * @remarks
 * Exported because `eve build` prepares the environment before any session exists. A tool that
 * needs a Vercel-specific capability, such as `setNetworkPolicy()`, passes it to
 * `ctx.getSandbox(environment)`.
 */
export const environment = VercelSandbox.environment();

/**
 * Agent sandbox configuration.
 *
 * @remarks
 * Pins the hosted Vercel Sandbox provider for both local development and production, so the
 * same environment runs everywhere. Without this file eve's default would pick Docker or just-bash
 * locally. Running locally requires the project to be linked and authenticated to Vercel.
 *
 * @see {@link https://vercel.com/docs/sandbox | Vercel Sandbox}
 */
export default defineSandbox(() => environment.open());
