# Marketing Team eve Template

[![Agent Stack](https://img.shields.io/badge/Agent%20Stack-000?style=flat-square&logo=vercel&logoColor=FFF&labelColor=000&color=000)](https://vercel.com/kb/agent-stack)
[![MIT License](https://img.shields.io/badge/License-MIT-000?style=flat-square&logo=opensourceinitiative&logoColor=white&labelColor=000&color=000)](LICENSE)

Team of marketing agents built on [eve](https://eve.dev). You bring work to a team lead: a launch to plan,posts to write, or a page that isn't converting. The lead holds the shared picture of the product, routes the request to the specialist who does that kind of work, and hands back what they produced.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=marketing-team-eve-template&repository-name=marketing-team-eve-template&repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fmarketing-team-eve-template%2Ftree%2Fmain&connect=%5B%7B%22type%22%3A%22notion%22%2C%22env%22%3A%22NOTION_CONNECTOR%22%7D%2C%7B%22type%22%3A%22resend%22%2C%22env%22%3A%22RESEND_CONNECTOR%22%7D%2C%7B%22type%22%3A%22slack%22%2C%22env%22%3A%22SLACK_CONNECTOR%22%2C%22triggers%22%3Atrue%2C%22triggerPath%22%3A%22%2Feve%2Fv1%2Fslack%22%7D%5D&stores=%5B%7B%22type%22%3A%22blob%22%2C%22access%22%3A%22public%22%7D%5D&env=TYPEFULLY_API_KEY&envDescription=API%20key%20for%20the%20Typefully%20MCP%20server%2C%20used%20to%20read%20and%20write%20social%20drafts)

## The team

| Specialist | Owns | Hands back |
| --- | --- | --- |
| `product-marketer` | Positioning, messaging, competitive alternatives, and the shared brand context document | The brand context document itself |
| `content-marketer` | Long-form: blog posts, landing pages, case studies, newsletters, docs | A Notion page link |
| `social-media-coordinator` | Short-form for X, LinkedIn, Threads, Bluesky, and Mastodon, plus the Typefully queue | Drafts in Typefully |
| `seo` | Page and site audits, hierarchy and internal linking, JSON-LD schema, templated page sets | Recommendations, long audits as artifacts |
| `email` | Reworking existing copy to survive an inbox, then building, targeting, and sending in Resend | A Resend campaign link |

The dependency runs one way. The product marketer writes the brand context; everyone else reads it at the start of every task. That makes it the one piece of shared state whose quality bounds everything else, which is why a single specialist owns authoring it.

The specialists do not overlap by accident. The product marketer decides what the team claims, the content marketer writes the words, `seo` decides which pages should exist, and `social-media-coordinator` and `email` are the two that can put something in front of an audience.

### One request routes twice

A newsletter is the case where two specialists chain. The content marketer authors the prose; the email specialist reworks it for the inbox and runs Resend.

Splitting it this way keeps the newsletter inside the planning and editing passes the content marketer already runs, instead of growing a second, thinner writer.

## How it works

- **One lead that delegates, not a generalist.** The root agent loads the brand context and this user's standing preferences, then briefs one specialist with everything it needs. It does not write the deliverable.
- **Subagents inherit nothing.** Every specialist runs in a fresh child session: no conversation history, no parent skills, tools, or connections. That is why the lead's instructions are mostly about writing a complete brief, and why each specialist loads the brand context again through its own `get_brand_context`.
- **The tree is one level deep, deliberately.** A specialist that finds its own evidence knows when it has enough, and one that edits its own draft against a written rubric catches most of what a second reader would. Each hop costs a full context handoff, so the lead delegates and specialists do not.
- **Research and editing are part of the craft.** Each specialist uses `web_search` and `web_fetch` against a source budget, then edits in deliberate passes before handing work back.
- **Skills load on demand.** Each skill is a `SKILL.md` plus reference files, pulled in only when its frontmatter `description` matches the situation.
- **No registry file.** A tool's name is its filename, a subagent's name is its directory name. eve walks `agent/` at build time. Adding a specialist means adding a directory.

### Publishing pauses for a human

Every irreversible action stops for an approve or deny decision, rendered as a button in Slack or the TUI.

| Action | Pauses |
| --- | --- |
| Send a Resend broadcast, email, or batch | Always, scheduled or not |
| Delete a Resend broadcast, template, contact, segment, or topic | Always |
| Change a contact's topic subscriptions | Always |
| Delete a Typefully draft, thread, or comment | Always |
| Create or edit a Typefully draft | Only when the draft is published |
| Move pages or change views in Notion | Always |
| Create or update a Notion page | No, drafting is the normal flow |
| `delete_asset`, `clear_user_preferences` | Always |
| `save_brand_context` | No, by design. The tool description tells the model to agree the document with you first |

The Resend connection goes one step further than gating. It narrows what the model can discover at all with `tools.allow`, cutting roughly 85 published tools to the 47 that make up the campaign, list, and diagnostic surface. Account administration such as API key creation and domain writes is never on the table.

### Slack opens with suggested prompts

Opening a fresh conversation with the team pins four starting prompts. Slack renders at most four, so it is one per specialist rather than a tour of the whole team.

| Prompt | Routes to |
| --- | --- |
| Sharpen our positioning | `product-marketer` |
| Write a blog post | `content-marketer` |
| Draft social posts | `social-media-coordinator` |
| Review a page's SEO | `seo` |

Each one names the deliverable, asks for the brand context and your preferences, then hands the interview back, so an unspecified request costs one question rather than a wasted delegation.

This requires `assistant:write` under Bot Scopes and the `assistant_thread_started` and `app_home_opened` trigger event types. Without them the prompts never appear, and the rest of the channel is unaffected.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=marketing-team-eve-template&repository-name=marketing-team-eve-template&repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fmarketing-team-eve-template%2Ftree%2Fmain&connect=%5B%7B%22type%22%3A%22notion%22%2C%22env%22%3A%22NOTION_CONNECTOR%22%7D%2C%7B%22type%22%3A%22resend%22%2C%22env%22%3A%22RESEND_CONNECTOR%22%7D%2C%7B%22type%22%3A%22slack%22%2C%22env%22%3A%22SLACK_CONNECTOR%22%2C%22triggers%22%3Atrue%2C%22triggerPath%22%3A%22%2Feve%2Fv1%2Fslack%22%7D%5D&stores=%5B%7B%22type%22%3A%22blob%22%2C%22access%22%3A%22public%22%7D%5D&env=TYPEFULLY_API_KEY&envDescription=API%20key%20for%20the%20Typefully%20MCP%20server%2C%20used%20to%20read%20and%20write%20social%20drafts)

The deploy button helps you provision and wire up everything:

| Provisioned | Sets |
| --- | --- |
| Notion connector | `NOTION_CONNECTOR` |
| Resend connector | `RESEND_CONNECTOR` |
| Slack connector, with its trigger pointed at eve's Slack route (`/eve/v1/slack`) | `SLACK_CONNECTOR` |
| Vercel Blob store | Blob credentials |
| Prompt for the Typefully API key | `TYPEFULLY_API_KEY` |

Then talk to the lead in the dev TUI or your own front end, and it routes work to the specialists.

### One manual step

**Resend sending.** Verify a sending domain and create at least one segment in the [Resend dashboard](https://resend.com/domains). The agent reads that state and picks from it, but cannot create a domain or verify DNS for you. The Resend connector is user-scoped, so each person authorizes their own login the first time they ask for email work, and sends are attributed to whoever approved them. Skip if you are not using email.

### Quick start with an AI coding agent

Working in Claude Code or Cursor? Paste this:

```text
I want to build a team of marketing agents with the eve framework, using the marketing team template. Read the setup instructions at https://agent-resources.dev/marketing-team-eve-template.md and follow them. They will cover deploying the template, building with eve, how everything works overall, and more.
```

## Tech stack

| Layer | Technology |
| --- | --- |
| Agent framework | [eve](https://eve.dev) |
| Language | TypeScript (strict, ESM), Node 24.x |
| Chat surfaces | Slack via Vercel Connect, the eve dev TUI, your own front end |
| Long-form deliverables and briefs | Notion (MCP) |
| Social publishing | Typefully (MCP) |
| Email campaigns | Resend (MCP) |
| Shared state and files | [Vercel Blob](https://vercel.com/docs/vercel-blob) |
| Model access | [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) |
| Skill reference files and `bash` | [Vercel Sandbox](https://vercel.com/docs/sandbox) |
| Lint and format | [Ultracite](https://www.ultracite.ai/), a [Biome](https://biomejs.dev/) preset |

### Credentials: one static key

| Service | Authenticates as | You manage |
| --- | --- | --- |
| Notion | Each user, OAuth via [Vercel Connect](https://vercel.com/docs/connect) | Connector UID only |
| Resend | Each user, OAuth via Vercel Connect | Connector UID only |
| Slack | Bot token brokered by Vercel Connect | Connector UID only |
| Typefully | One shared workspace key | `TYPEFULLY_API_KEY` |
| Vercel Blob | Project [OIDC](https://vercel.com/docs/oidc) token | Nothing |
| AI Gateway | Project OIDC token | Nothing |

Typefully's MCP server only accepts a static key, so it is the single credential in the project and its connection is shared across all users.

Resend is the one place per-user scoping earns its keep. Sending is the only thing this team does that cannot be undone, so a per-user token means the approval names who agreed to it and Resend records who sent it, instead of every campaign arriving from one shared workspace key.

## Project layout

```text
agent/
  agent.ts                    # lead: model and compaction threshold
  instructions.md             # lead behavior: ground, route once, hand back
  sandbox.ts
  channels/
    eve.ts                    # inbound route for the TUI and your own front end
    slack.ts                  # inbound route for Slack
  connections/notion.ts
  tools/                      # brand context, user preferences, read_artifact
  lib/                        # shared factories, imported as #lib/<domain>/<file>.js
    vercel-blob/              # Blob key layout and the 5 asset tool factories
    brand-context/            # the shared document's key and tool factories
    user-preferences/         # principal-scoped key and size cap
    content/                  # lint_against_style, save/read_artifact
    writing-quality/          # the shared prose-rules skill
  subagents/
    product-marketer/  content-marketer/  social-media-coordinator/  seo/  email/
```

Every specialist directory holds the same shape: an `agent.ts` with the routing description, an `instructions.md`, its own `sandbox.ts`, a `tools/` with the five asset tools plus `get_brand_context` and the artifact tools, a `bash.ts` that disables the shell, and its own `skills/`.

| Specialist | Skills | Connections |
| --- | --- | --- |
| `product-marketer` | `positioning`, `messaging`, `customer-research`, `brand-context` | Notion |
| `content-marketer` | `blog-style`, `content-planning`, `content-editing`, `writing-quality` | Notion |
| `social-media-coordinator` | `x-style`, `linkedin-style`, `threads-style`, `bluesky-style`, `mastodon-style`, `writing-quality` | Typefully, Notion |
| `seo` | `seo-audit`, `site-architecture`, `schema`, `programmatic-seo` | Notion |
| `email` | `email-style`, `email-adaptation`, `deliverability`, `resend-build`, `writing-quality` | Resend, Notion |

Two specialists carry an evidence boundary worth knowing about. `seo` has no crawler, rank tracker, or Search Console, and its audit checklist marks every check as verifiable by fetch or not verifiable at all. `email` cannot see inbox placement or domain reputation, and its deliverability checklist does the same. Both are built to say what they could not check rather than infer it.

## Local development

Link the project you deployed, or a fresh one, and pull its environment:

```bash
vercel link
vercel env pull
pnpm dev          # then run /model once in the TUI to link a provider
```

| Command | Does |
| --- | --- |
| `pnpm dev` | eve dev TUI |
| `pnpm validate` | Lint, typecheck, and discovery diagnostics in one |
| `pnpm check` / `pnpm fix` | Ultracite check and auto-fix |
| `pnpm typecheck` | `tsc --noEmit` |
| `npx eve info` | Print every discovered tool, skill, connection, and subagent |
| `eve deploy` | Ship to production |

There is no unit test suite. Verify with `pnpm validate`, which must report 0 errors and 0 warnings, then exercise the agent in the TUI. Approval gates render there too, so it is the place to confirm a send actually stops before it goes out.

`npx eve info` is the fastest way to confirm a change landed. If a file you added does not appear, discovery did not classify it as an authored slot, and `.eve/discovery/diagnostics.json` says why.

<details>
<summary><strong>Setting up the connectors by hand</strong></summary>

The Deploy button does this for you. For a project you did not create with the button, use the [Vercel CLI](https://vercel.com/docs/cli):

```bash
# Notion connector (prints the UID notion/marketing-team -> NOTION_CONNECTOR)
vercel connect create notion --name marketing-team

# Resend connector (prints the UID resend/marketing-team -> RESEND_CONNECTOR)
vercel connect create resend --name marketing-team

# Slack connector, then re-point its trigger at eve's Slack route
vercel connect create slack --name marketing-team --triggers
vercel connect detach slack/marketing-team --yes
vercel connect attach slack/marketing-team --triggers --trigger-path /eve/v1/slack --yes

# Blob store
vercel blob create-store assets --access public --yes

# Typefully API key, from your Typefully workspace settings
vercel env add TYPEFULLY_API_KEY
```

Verify a sending domain in the [Resend dashboard](https://resend.com/domains) as well. Nothing can be sent without one.

</details>

## Customizing

Where to edit, at a glance. [`CUSTOMIZING.md`](./CUSTOMIZING.md) is the walkthrough, with recipes for adding a specialist, skill, tool, or connection, and the silent failures worth knowing about.

The agent auto-updates as you edit these files.

| To change | Edit | Notes |
| --- | --- | --- |
| Who is on the team | Add a directory under `agent/subagents/` | The directory name is the tool name; the `description` in its `agent.ts` is all the lead sees when choosing |
| The lead's behavior | `agent/instructions.md` | Grounding, routing, brief writing, handing back |
| A specialist's craft | Its `instructions.md` and `skills/` | A skill's frontmatter `description` decides when it loads |
| Voice and banned words | `references/banned-words.json` in each `<surface>-style` skill | Add a surface by adding the skill folder and passing its name in that agent's `tools/lint_against_style.ts` |
| Approval gates | `APPROVAL_REQUIRED_TOOLS` in `connections/notion.ts`, `DELETE_TOOLS` / `PUBLISH_TOOLS` in `typefully.ts`, `SEND_TOOLS` / `DESTRUCTIVE_TOOLS` in `resend.ts` | The Notion copies are identical, so change them together |
| What the email agent can reach | `ALLOWED_TOOLS` in `connections/resend.ts` | An allow list of 47 tools out of roughly 85. Prefer adding a name here over loosening a gate |
| Models | `agent/agent.ts` and each `agent/subagents/<id>/agent.ts` | Or run `/model` in the TUI. Every agent runs the same model; the lead routes rather than writes, so it is the first place to try a cheaper tier |
| Shared code | `agent/lib/<domain>/` | eve scopes skills to one agent, so a shared procedure is either copied markdown or a `defineSkill` factory called from a one-line file per agent |

### Adding a remote specialist

Specialists do not have to live in this repo. eve's [remote agents](https://eve.dev/docs/guides/remote-agents) let the lead delegate to an agent in its own deployment, with its own skills, connections, and release cycle. `vercelOidc()` handles deployment-to-deployment auth with no shared secret.

```ts
// agent/subagents/paid_ads.ts
import { defineRemoteAgent } from "eve";
import { vercelOidc } from "eve/agents/auth";

export default defineRemoteAgent({
  url: () => process.env.PAID_ADS_AGENT_URL ?? "https://your-paid-ads-agent.vercel.app",
  description:
    "Plan and write paid search and social ads: audience, offer, and the copy variants to test. " +
    "Pass the campaign goal, the audience, the budget, and any brand constraints in the message.",
  auth: vercelOidc(),
});
```

Set `PAID_ADS_AGENT_URL`, and the lead picks the specialist up from its `description` exactly as it does the local ones. The result comes back as a normal tool result. This suits work needing credentials or a release cycle you would rather keep out of this repo, such as ad platform access.

## Learn more

| Link | Covers |
| --- | --- |
| [Run a marketing team from Slack with eve](https://vercel.com/kb/guide/marketing-team-eve) | The guide to this template, end to end |
| [eve documentation](https://eve.dev/docs/introduction) | The framework powering this agent |
| [eve subagents](https://eve.dev/docs/subagents) | Delegation, fresh sessions, routing descriptions |
| [eve skills](https://eve.dev/docs/skills) | Load-on-demand skills and reference files |
| [Human in the loop](https://eve.dev/docs/human-in-the-loop) | The approval gates above |
| [Vercel Connect](https://vercel.com/docs/connect) | Notion, Resend, and Slack credentials |
| [Vercel Blob](https://vercel.com/docs/vercel-blob) | Brand context, preferences, artifacts, assets |
| [Typefully API](https://typefully.com) | The social publishing queue |
| [Resend MCP server](https://resend.com/docs/mcp-server) | The email tools the email specialist calls |

Deeper internals live in [`ARCHITECTURE.md`](./ARCHITECTURE.md), and conventions for working in this repo live in [`AGENTS.md`](./AGENTS.md).

## Related templates

- [eve Sanity Copilot](https://github.com/vercel-labs/sanity-copilot-eve-template)
- [eve Content Agent](https://github.com/vercel-labs/eve-content-agent-template)
- [eve Personal Agent](https://vercel.com/templates/nuxt/eve-personal-agent)
