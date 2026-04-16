import type { CSVColumnDef } from "@/types";

/* ------------------------------------------------------------------ */
/*  CSV templates                                                       */
/* ------------------------------------------------------------------ */

export const csvTemplates: Record<
  string,
  { label: string; columns: CSVColumnDef[] }
> = {
  customers: {
    label: "Customers",
    columns: [
      { key: "name", label: "Name", required: true, example: "Acme Corp" },
      {
        key: "email",
        label: "Email",
        required: true,
        example: "contact@acme.com",
      },
      {
        key: "company",
        label: "Company",
        required: true,
        example: "Acme Corporation",
      },
      { key: "mrr", label: "MRR", required: false, example: "2500" },
      {
        key: "health",
        label: "Health Score",
        required: false,
        example: "85",
      },
    ],
  },
  deals: {
    label: "Deals",
    columns: [
      {
        key: "title",
        label: "Deal Title",
        required: true,
        example: "Enterprise Plan Upgrade",
      },
      {
        key: "company",
        label: "Company",
        required: true,
        example: "Acme Corp",
      },
      { key: "value", label: "Deal Value", required: true, example: "50000" },
      {
        key: "stage",
        label: "Stage",
        required: false,
        example: "proposal",
      },
      {
        key: "assignee",
        label: "Assignee",
        required: false,
        example: "Sarah Khan",
      },
    ],
  },
  revenue: {
    label: "Revenue",
    columns: [
      {
        key: "month",
        label: "Month",
        required: true,
        example: "2026-01",
      },
      {
        key: "revenue",
        label: "Revenue",
        required: true,
        example: "125000",
      },
      {
        key: "newRevenue",
        label: "New Revenue",
        required: false,
        example: "30000",
      },
      {
        key: "churnedRevenue",
        label: "Churned Revenue",
        required: false,
        example: "5000",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Generate a CSV string (header + one sample row) for a template      */
/* ------------------------------------------------------------------ */

export function generateCSVTemplate(templateKey: string): string {
  const template = csvTemplates[templateKey];
  if (!template) return "";

  const header = template.columns.map((c) => c.label).join(",");
  const sampleRow = template.columns.map((c) => c.example).join(",");

  return `${header}\n${sampleRow}`;
}
