<img width="2048" height="768" alt="eve Marketing Agent Template banner" src="https://github.com/user-attachments/assets/b72d9959-5bed-4b86-a40a-7fc7bfe8fe80" />

# Marketing Team eve Template

[![Agent Stack](https://img.shields.io/badge/Agent%20Stack-000?style=flat-square&logo=vercel&logoColor=FFF&labelColor=000&color=000)](https://vercel.com/kb/agent-stack)
[![MIT License](https://img.shields.io/badge/License-MIT-000?style=flat-square&logo=opensourceinitiative&logoColor=white&labelColor=000&color=000)](LICENSE)

Run a team of marketing agents built on [eve](https://eve.dev). You bring work to a team lead: a launch to plan, posts to write, or a page that isn't converting. The lead briefs the right specialist and hands back what they produced.

You talk to it in Slack or a terminal. It delivers real work in the tools you already use: blog drafts in Notion, social posts in Typefully, email campaigns in Resend.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=marketing-team-eve-template&repository-name=marketing-team-eve-template&repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fmarketing-team-eve-template%2Ftree%2Fmain&connect=%5B%7B%22type%22%3A%22notion%22%2C%22env%22%3A%22NOTION_CONNECTOR%22%7D%2C%7B%22type%22%3A%22resend%22%2C%22env%22%3A%22RESEND_CONNECTOR%22%7D%2C%7B%22type%22%3A%22slack%22%2C%22env%22%3A%22SLACK_CONNECTOR%22%2C%22triggers%22%3Atrue%2C%22triggerPath%22%3A%22%2Feve%2Fv1%2Fslack%22%7D%5D&stores=%5B%7B%22type%22%3A%22blob%22%2C%22access%22%3A%22public%22%7D%5D&env=TYPEFULLY_API_KEY&envDescription=API%20key%20for%20the%20Typefully%20MCP%20server%2C%20used%20to%20read%20and%20write%20social%20drafts)

## What using it looks like

> **You:** We're launching workspace templates next Thursday. Can you draft the announcement posts?
>
> **Lead:** On it. I'll check the brand context and brief the social media coordinator.
>
> **Lead:** Done. Three drafts are in your Typefully queue: an X thread, a LinkedIn post, and a Bluesky post. Nothing is scheduled yet, so review them and tell me when to queue them for launch morning.

Anything irreversible, like sending an email campaign or publishing a scheduled post, pauses for your approval first. You get an approve or deny button in Slack or the terminal before it goes out.

## Deploy

The one-click deploy provisions and wires up everything the team needs:

| Provisioned | Sets |
| --- | --- |
| Notion connector | `NOTION_CONNECTOR` |
| Resend connector | `RESEND_CONNECTOR` |
| Slack connector | `SLACK_CONNECTOR` |
| Vercel Blob store | Blob credentials |
| Prompt for the Typefully API key | `TYPEFULLY_API_KEY` |

### Before your first email campaign

Verify a sending domain and create at least one segment in the [Resend dashboard](https://resend.com/domains). The agent sees your verified domains and segments and picks from them, but it cannot create a domain or verify DNS for you.

### Quick start with an AI coding agent

Working in Claude Code or Cursor? Paste this:

```text
I want to build a team of marketing agents with the eve framework, using the marketing team template. Read the setup instructions at https://agent-resources.dev/marketing-team-eve-template.md and follow them. They will cover deploying the template, building with eve, how everything works overall, and more.
```

## The team

| Specialist | Owns | Hands back |
| --- | --- | --- |
| `product-marketer` | Positioning, messaging, competitive alternatives, and the shared brand context document | The brand context document itself |
| `content-marketer` | Long-form: blog posts, landing pages, case studies, newsletters, docs | A Notion page link |
| `social-media-coordinator` | Short-form for X, LinkedIn, Threads, Bluesky, and Mastodon, plus the Typefully queue | Drafts in Typefully |
| `seo` | Page and site audits, hierarchy and internal linking, JSON-LD schema, templated page sets | Recommendations, long audits as artifacts |
| `email` | Reworking existing copy for the inbox, then building, targeting, and sending in Resend | A Resend campaign link |

The team shares one piece of state: the **brand context document**, a short file describing what your product is, who it's for, and what the team claims about it. The product marketer maintains it; every other specialist reads it at the start of a task. Because it's the team's only shared state, it has a single owner.

Each specialist has a distinct job: the product marketer decides what the team claims, the content marketer writes long-form copy, `seo` decides which pages should exist, and `social-media-coordinator` and `email` publish to an audience. Newsletters route through two of them: the content marketer writes the prose, then the email specialist adapts it for the inbox and sends it through Resend, so newsletters still get the content marketer's planning and editing passes.

## How it works

- **One lead, five specialists.** The lead loads the brand context and your preferences, writes a brief for the right specialist, and hands back what they produce. It never writes deliverables itself.
- **Every brief is self-contained.** Specialists start fresh each time, with no shared conversation history, so the lead's brief carries everything and each specialist reads the brand context itself.
- **Delegation goes one level deep.** Specialists do their own research and edit their own drafts against a written rubric rather than spawning further agents.
- **Nothing irreversible happens without you.** Sends and deletes in Resend, deletes and scheduled publishes in Typefully, and page moves in Notion all wait for your approval. Drafting stays friction-free. The email specialist also only sees 47 of Resend's roughly 85 tools, so account administration is out of reach entirely.
- **Slack pins four starter prompts** in a fresh conversation, one per specialist: sharpen our positioning, write a blog post, draft social posts, review a page's SEO.

The full approval matrix, the credential model, and the reasoning behind each boundary live in [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

## Local development

Link the project you deployed, or a fresh one, and pull its environment:

```bash
vercel link
vercel env pull
pnpm dev          # then run /model once in the TUI to link a provider
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | eve dev TUI |
| `pnpm validate` | Lint, typecheck, and discovery diagnostics in one |
| `pnpm check` / `pnpm fix` | Ultracite check and auto-fix |
| `pnpm typecheck` | `tsc --noEmit` |
| `npx eve info` | Print every discovered tool, skill, connection, and subagent |
| `eve deploy` | Ship to production |

## Under the hood

| Layer | Technology |
| --- | --- |
| Agent framework | [eve](https://eve.dev) |
| Language | TypeScript (strict, ESM), Node 24.x |
| Chat surfaces | Slack via Vercel Connect, the eve dev TUI |
| Long-form deliverables and briefs | Notion (MCP) |
| Social publishing | Typefully (MCP) |
| Email campaigns | Resend (MCP) |
| Shared state and files | [Vercel Blob](https://vercel.com/docs/vercel-blob) |
| Model access | [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) |
| Skill reference files and `bash` | [Vercel Sandbox](https://vercel.com/docs/sandbox) |
| Lint and format | [Ultracite](https://www.ultracite.ai/), a [Biome](https://biomejs.dev/) preset |

## Customizing

The agent auto-updates as you edit these files. [`docs/CUSTOMIZING.md`](./docs/CUSTOMIZING.md) is the full walkthrough, with recipes for adding a specialist, skill, tool, or connection.

| To change | Edit |
| --- | --- |
| Who is on the team | Add a directory under `agent/subagents/`; its `description` is all the lead sees when routing |
| The lead's behavior | `agent/instructions.md` |
| A specialist's craft | Its `instructions.md` and `skills/` |
| Voice and banned words | `references/banned-words.json` in each `<surface>-style` skill |
| Approval gates | The tool lists in each `connections/*.ts` |
| What the email agent can reach | `ALLOWED_TOOLS` in `connections/resend.ts` |
| Models | `agent/agent.ts` and each specialist's `agent.ts`, or `/model` in the TUI |

Specialists don't have to live in this repo. eve's [remote agents](https://eve.dev/docs/guides/remote-agents) let the lead delegate to an agent in its own deployment, with its own skills, connections, and release cycle:

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

Set `PAID_ADS_AGENT_URL`, and the lead picks the specialist up from its `description` exactly as it does the local ones. Useful when a specialist needs credentials or a release cycle you'd rather keep out of this repo, such as ad platform access.

## Learn more

| Link | Covers |
| --- | --- |
| [Run a marketing team from Slack with eve](https://vercel.com/kb/guide/marketing-team-eve) | The guide to this template, end to end |
| [eve documentation](https://eve.dev/docs/introduction) | The framework powering this agent |
| [eve subagents](https://eve.dev/docs/subagents) | Delegation, fresh sessions, routing descriptions |
| [eve skills](https://eve.dev/docs/skills) | Load-on-demand skills and reference files |
| [Human in the loop](https://eve.dev/docs/human-in-the-loop) | The approval gates above |
| [Vercel Connect](https://vercel.com/docs/connect) | Notion, Resend, and Slack credentials |

Deeper internals live in [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) and agent guidance lives in [`AGENTS.md`](./AGENTS.md).

## Related templates

- [eve Sanity Copilot](https://github.com/vercel-labs/sanity-copilot-eve-template)
- [eve Typefully Agent](https://github.com/vercel-labs/typefully-eve-template)
- [eve Content Agent](https://github.com/vercel-labs/eve-content-agent-template)
