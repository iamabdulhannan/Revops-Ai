import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Building2,
  Clock,
  DollarSign,
  FileBarChart,
  Gauge,
  Globe,
  Layers,
  PieChart,
  Rocket,
  Shield,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ---------- Use Cases Data ---------- */

const useCases = [
  {
    id: "saas-forecasting",
    icon: BrainCircuit,
    category: "SaaS",
    title: "AI Revenue Forecasting for SaaS",
    headline: "Predict revenue with 85% accuracy — not gut feel",
    description:
      "Your CEO asks \"Will we hit our number this quarter?\" and you spend 2 days in spreadsheets trying to answer. RevOps AI analyzes your pipeline, historical win rates, deal velocity, and engagement signals to give you a real-time forecast that updates every hour.",
    painBefore: [
      "Forecasts based on rep opinions, not data",
      "2-3 days per month building forecast spreadsheets",
      "End-of-quarter surprises that destroy trust with the board",
      "No visibility into which deals will actually close",
    ],
    outcomeAfter: [
      "AI-powered forecasts with 85% accuracy",
      "Real-time pipeline updates — no manual entry",
      "Deal-level probability scores based on engagement signals",
      "Board-ready forecast report in 30 seconds",
    ],
    metrics: [
      { value: "85%", label: "Forecast Accuracy" },
      { value: "90%", label: "Time Saved on Reporting" },
      { value: "23%", label: "Improvement in Quota Attainment" },
    ],
    bestFor: "B2B SaaS companies with $2M-$50M ARR and 10+ active deals per quarter",
  },
  {
    id: "churn-prevention",
    icon: Shield,
    category: "Customer Success",
    title: "Proactive Churn Prevention",
    headline: "Know which customers will churn — before they do",
    description:
      "By the time a customer says they're leaving, it's already too late. RevOps AI monitors 30+ signals — support ticket frequency, login patterns, NPS changes, billing disputes, feature usage — and alerts your CS team weeks before churn happens.",
    painBefore: [
      "Churn surprises at renewal time",
      "CS team reacts instead of prevents",
      "No unified view of customer health across tools",
      "Expansion opportunities missed because nobody flagged them",
    ],
    outcomeAfter: [
      "AI churn risk scores updated daily for every account",
      "Automated alerts when risk exceeds threshold",
      "Unified customer health dashboard across all tools",
      "Expansion signals identified automatically",
    ],
    metrics: [
      { value: "40%", label: "Reduction in Churn" },
      { value: "3 Weeks", label: "Earlier Churn Detection" },
      { value: "25%", label: "Increase in Expansion Revenue" },
    ],
    bestFor: "Subscription businesses with 100+ customers and a CS team",
  },
  {
    id: "board-reporting",
    icon: FileBarChart,
    category: "Finance / Leadership",
    title: "Board-Ready Reports in 30 Seconds",
    headline: "End the Sunday night spreadsheet marathon",
    description:
      "Your board meeting is Monday. It's Sunday evening and you're still pulling data from 5 tools, pasting into Google Sheets, and praying the numbers tie out. RevOps AI generates investor-grade reports instantly — MRR waterfall, cohort analysis, revenue attribution, retention curves — all from one click.",
    painBefore: [
      "8-12 hours per month building board reports manually",
      "Data pulled from 5+ tools rarely ties out",
      "Metrics defined differently across teams",
      "Reports are backward-looking, never predictive",
    ],
    outcomeAfter: [
      "One-click board reports with live data",
      "Standardized metrics across all revenue teams",
      "AI-generated executive summary with key insights",
      "Forward-looking forecasts included automatically",
    ],
    metrics: [
      { value: "30 Sec", label: "Time to Generate Report" },
      { value: "100%", label: "Data Accuracy (auto-reconciled)" },
      { value: "$15K+", label: "Saved vs. Analyst Salary" },
    ],
    bestFor: "CEOs, CFOs, and VP RevOps who report to board/investors monthly or quarterly",
  },
  {
    id: "services-profitability",
    icon: Building2,
    category: "IT Services",
    title: "Project Profitability for Service Companies",
    headline: "See which projects make money — and which quietly bleed it",
    description:
      "You have 30 active projects across 15 clients. Some are profitable, some are underwater, but you won't know until the project ends. RevOps AI's Services Mode tracks real-time margin per project, per client, per team — and alerts you when a project trends toward negative margin before it's too late.",
    painBefore: [
      "Project profitability known only after completion",
      "Scope creep silently destroys margins",
      "Utilization tracked in spreadsheets (if at all)",
      "Client concentration risk goes unmonitored",
    ],
    outcomeAfter: [
      "Real-time margin tracking per project and client",
      "AI alerts when scope creep threatens profitability",
      "Utilization dashboards with bench rate optimization",
      "Client concentration risk alerts (>30% single-client)",
    ],
    metrics: [
      { value: "15%", label: "Margin Improvement" },
      { value: "Real-time", label: "Profitability Visibility" },
      { value: "2x", label: "Faster Revenue Recognition" },
    ],
    bestFor: "IT services companies with 200-1,000 employees running 10+ concurrent projects",
  },
  {
    id: "pipeline-optimization",
    icon: Target,
    category: "Sales",
    title: "AI Pipeline Scoring & Deal Intelligence",
    headline: "Stop wasting time on deals that will never close",
    description:
      "Your reps have 40 deals in their pipeline but only 8 will close this quarter. Which ones? RevOps AI scores every deal based on engagement signals, firmographic fit, historical win patterns, and buyer intent — so your team focuses on the deals that matter.",
    painBefore: [
      "Pipeline reviews based on gut feel and anecdotes",
      "Reps waste time on low-probability deals",
      "No data on what makes a deal more likely to close",
      "Stalled deals clog the pipeline for months",
    ],
    outcomeAfter: [
      "AI health scores on every deal (0-100)",
      "Prioritized daily action lists for every rep",
      "Automated nudges when deals stall for 7+ days",
      "Pattern analysis: what top closers do differently",
    ],
    metrics: [
      { value: "30%", label: "Increase in Win Rate" },
      { value: "20%", label: "Shorter Sales Cycle" },
      { value: "45%", label: "More Accurate Pipeline Value" },
    ],
    bestFor: "Sales teams with 5+ reps and enterprise or mid-market deal cycles",
  },
  {
    id: "revenue-attribution",
    icon: PieChart,
    category: "Marketing",
    title: "Multi-Touch Revenue Attribution",
    headline: "Finally prove which campaigns actually drive revenue",
    description:
      "Marketing says the blog drives pipeline. Sales says it's all outbound. Nobody knows the truth because attribution is a mess. RevOps AI tracks every touchpoint — from first ad impression to closed-won — and attributes revenue across the entire buyer journey with multi-touch models.",
    painBefore: [
      "Marketing and Sales argue about what drives pipeline",
      "Last-touch attribution gives credit to the wrong channel",
      "No way to measure true campaign ROI",
      "Budget allocation based on opinions, not data",
    ],
    outcomeAfter: [
      "Multi-touch attribution across all channels",
      "Campaign-level ROI with confidence intervals",
      "AI-recommended budget allocation for maximum pipeline",
      "Unified view of marketing and sales contribution",
    ],
    metrics: [
      { value: "3.2x", label: "Marketing ROI Improvement" },
      { value: "100%", label: "Touchpoint Visibility" },
      { value: "35%", label: "Better Budget Allocation" },
    ],
    bestFor: "Companies spending $10K+/month on marketing across multiple channels",
  },
  {
    id: "multi-currency",
    icon: Globe,
    category: "Global Operations",
    title: "Multi-Currency Revenue Intelligence",
    headline: "Stop letting forex silently eat your margins",
    description:
      "You bill clients in USD, EUR, and GBP but your costs are in PKR and INR. A 5% currency swing can wipe out an entire project's margin. RevOps AI provides real-time multi-currency consolidation, margin impact analysis, and hedging alerts so you always know your true profitability.",
    painBefore: [
      "Forex impact on margins discovered too late",
      "Multi-entity revenue consolidation is manual",
      "No real-time visibility into regional profitability",
      "Monthly close takes weeks for multi-currency reconciliation",
    ],
    outcomeAfter: [
      "Real-time conversion across 50+ currencies",
      "Automated margin impact alerts on forex movements",
      "Consolidated multi-entity revenue dashboards",
      "AI-recommended hedging strategies",
    ],
    metrics: [
      { value: "50+", label: "Currencies Supported" },
      { value: "Real-time", label: "Margin Impact Analysis" },
      { value: "75%", label: "Faster Monthly Close" },
    ],
    bestFor: "Companies operating in 2+ countries with mixed-currency revenue streams",
  },
  {
    id: "revops-automation",
    icon: Workflow,
    category: "Operations",
    title: "Automated Revenue Playbooks",
    headline: "Your revenue machine runs even while you sleep",
    description:
      "When a deal stalls for 7 days, the right person should be notified. When NPS drops below 7, CS should get an alert. When a customer's usage spikes, the expansion team should know. RevOps AI lets you build these revenue playbooks once — then they run automatically, forever.",
    painBefore: [
      "Revenue processes depend on people remembering to act",
      "Handoffs between marketing, sales, and CS break down",
      "No automated escalation when metrics hit thresholds",
      "Tribal knowledge lost when employees leave",
    ],
    outcomeAfter: [
      "Visual playbook builder — no code required",
      "Trigger on any revenue signal across any tool",
      "Automated Slack/email alerts and task creation",
      "Audit trail of every playbook execution",
    ],
    metrics: [
      { value: "60%", label: "Fewer Dropped Handoffs" },
      { value: "24/7", label: "Revenue Machine Uptime" },
      { value: "4 Hours", label: "Saved per Week per Rep" },
    ],
    bestFor: "Revenue teams that have repeatable processes but execute them manually",
  },
];

/* ---------- Page Component ---------- */

export default function UseCasesPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Page header */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 mb-3">
            Use Cases
          </p>
          <h1 className="text-4xl font-bold text-black tracking-tight">
            See How Teams Like Yours Use RevOps AI
          </h1>
          <p className="mt-4 text-md text-grey-500 max-w-2xl mx-auto">
            From AI forecasting to board-ready reports, from churn prevention
            to multi-currency intelligence — see exactly how RevOps AI solves
            the problems keeping revenue leaders up at night.
          </p>
        </div>

        {/* Category pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {["All", "SaaS", "Sales", "Customer Success", "IT Services", "Marketing", "Finance / Leadership", "Global Operations", "Operations"].map((cat) => (
            <span
              key={cat}
              className={cn(
                "px-4 py-1.5 rounded-pill text-xs font-medium border transition-colors duration-150 cursor-default",
                cat === "All"
                  ? "bg-black text-white border-black"
                  : "bg-white text-grey-600 border-border hover:border-grey-400"
              )}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Use Cases */}
        <div className="mt-16 space-y-12">
          {useCases.map((uc, index) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.id}
                id={uc.id}
                className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
              >
                {/* Card Header */}
                <div className="px-8 pt-8 pb-6 border-b border-border-light">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-grey-50 border border-border-light shrink-0">
                        <Icon className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <span className="text-2xs font-semibold uppercase tracking-wider text-grey-400">
                          {uc.category}
                        </span>
                        <h2 className="text-xl font-bold text-black tracking-tight mt-1">
                          {uc.title}
                        </h2>
                        <p className="text-md text-grey-600 font-medium mt-1">
                          {uc.headline}
                        </p>
                      </div>
                    </div>
                    <span className="hidden sm:flex items-center justify-center w-10 h-10 bg-grey-50 border border-border-light rounded-lg text-sm font-bold text-grey-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-8 py-6">
                  <p className="text-sm text-grey-500 leading-relaxed max-w-3xl">
                    {uc.description}
                  </p>

                  {/* Before / After Grid */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Before */}
                    <div className="bg-grey-50 rounded-lg p-6 border border-border-light">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-danger mb-4">
                        Without RevOps AI
                      </h3>
                      <ul className="space-y-3">
                        {uc.painBefore.map((p) => (
                          <li
                            key={p}
                            className="flex items-start gap-2.5 text-sm text-grey-600"
                          >
                            <span className="text-danger shrink-0 mt-0.5 text-xs">✕</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* After */}
                    <div className="bg-white rounded-lg p-6 border border-success/20">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-success mb-4">
                        With RevOps AI
                      </h3>
                      <ul className="space-y-3">
                        {uc.outcomeAfter.map((o) => (
                          <li
                            key={o}
                            className="flex items-start gap-2.5 text-sm text-grey-600"
                          >
                            <span className="text-success shrink-0 mt-0.5 text-xs">✓</span>
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mt-6 flex flex-wrap gap-4">
                    {uc.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="flex items-center gap-3 bg-grey-50 border border-border-light rounded-lg px-5 py-3"
                      >
                        <span className="text-xl font-bold text-black">
                          {m.value}
                        </span>
                        <span className="text-xs text-grey-500">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Best for */}
                  <div className="mt-6 flex items-start gap-2 text-xs text-grey-400">
                    <Users className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-grey-600">Best for:</strong>{" "}
                      {uc.bestFor}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-black rounded-lg p-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              See Your Revenue Use Case in Action
            </h2>
            <p className="mt-3 text-sm text-grey-400 max-w-lg mx-auto">
              Every revenue team is different. Start your free trial and see
              exactly how RevOps AI works with your data, your tools, and your
              team&apos;s workflow.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Link
                href={ROUTES.REGISTER}
                className="inline-flex items-center gap-2 justify-center px-7 py-3 text-sm font-medium rounded-sm bg-white text-black hover:bg-grey-100 transition-colors duration-150"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
