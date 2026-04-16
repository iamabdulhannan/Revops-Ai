"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/cn";

const initialCustomers = [
  {
    id: "cust-001",
    name: "Sarah Chen",
    company: "Acme Corp",
    mrr: 8400,
    health: "healthy" as const,
    lastActivity: "2 hours ago",
  },
  {
    id: "cust-002",
    name: "James Wilson",
    company: "TechFlow Inc",
    mrr: 12800,
    health: "healthy" as const,
    lastActivity: "1 day ago",
  },
  {
    id: "cust-003",
    name: "Maria Garcia",
    company: "DataSync Ltd",
    mrr: 4200,
    health: "critical" as const,
    lastActivity: "14 days ago",
  },
  {
    id: "cust-004",
    name: "David Kim",
    company: "CloudOps Inc",
    mrr: 3800,
    health: "at-risk" as const,
    lastActivity: "21 days ago",
  },
  {
    id: "cust-005",
    name: "Lisa Chen",
    company: "Nova Digital",
    mrr: 6200,
    health: "healthy" as const,
    lastActivity: "3 hours ago",
  },
  {
    id: "cust-006",
    name: "Tom Martinez",
    company: "Pulse Analytics",
    mrr: 5600,
    health: "healthy" as const,
    lastActivity: "5 hours ago",
  },
];

const healthColors: Record<string, string> = {
  healthy: "bg-success-light text-success",
  "at-risk": "bg-warning-light text-warning",
  critical: "bg-danger-light text-danger",
};

const healthLabels: Record<string, string> = {
  healthy: "Healthy",
  "at-risk": "At Risk",
  critical: "Critical",
};

const filterOptions = ["all", "healthy", "at-risk", "critical"] as const;

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [healthFilter, setHealthFilter] = useState<string>("all");
  const [customers, setCustomers] = useState(initialCustomers);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newMrr, setNewMrr] = useState("");
  const [newHealth, setNewHealth] = useState("healthy");

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase());
      const matchesHealth =
        healthFilter === "all" || c.health === healthFilter;
      return matchesSearch && matchesHealth;
    });
  }, [customers, search, healthFilter]);

  const handleAddCustomer = () => {
    const customer = {
      id: "cust-" + Date.now(),
      name: newName.trim(),
      company: newCompany.trim(),
      mrr: parseFloat(newMrr) || 0,
      health: newHealth as "healthy" | "at-risk" | "critical",
      lastActivity: "Just now",
    };
    setCustomers((prev) => [...prev, customer]);
    setNewName("");
    setNewEmail("");
    setNewCompany("");
    setNewMrr("");
    setNewHealth("healthy");
    setShowModal(false);
  };

  return (
    <div>
      <PageHeader title="Customers" subtitle="Manage your customer accounts">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-sm bg-black text-white hover:bg-grey-800 transition-colors duration-150 shadow-button"
        >
          Add Customer
        </button>
      </PageHeader>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-grey-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full h-10 pl-9 pr-4 border border-grey-300 rounded-sm bg-white text-sm placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
        <div className="inline-flex rounded-[6px] border border-border bg-grey-50 p-0.5">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setHealthFilter(opt)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-[4px] transition-colors duration-150 capitalize",
                healthFilter === opt
                  ? "bg-black text-white shadow-button"
                  : "text-grey-600 hover:text-black"
              )}
            >
              {opt === "all" ? "All" : healthLabels[opt]}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Table */}
      <div className="rounded-[6px] bg-white border border-border shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-grey-50 border-b border-grey-300">
              <th className="text-left text-xs uppercase font-medium text-grey-500 px-4 py-3 tracking-wider">
                Customer
              </th>
              <th className="text-left text-xs uppercase font-medium text-grey-500 px-4 py-3 tracking-wider">
                Company
              </th>
              <th className="text-left text-xs uppercase font-medium text-grey-500 px-4 py-3 tracking-wider">
                MRR
              </th>
              <th className="text-left text-xs uppercase font-medium text-grey-500 px-4 py-3 tracking-wider">
                Health
              </th>
              <th className="text-left text-xs uppercase font-medium text-grey-500 px-4 py-3 tracking-wider">
                Last Activity
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-grey-100 last:border-b-0 hover:bg-grey-50 transition-colors duration-150"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/customers/${customer.id}`}
                    className="text-sm font-medium text-black hover:underline"
                  >
                    {customer.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-grey-600">
                  {customer.company}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-black">
                  ${customer.mrr.toLocaleString()}/mo
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-pill px-2 py-0.5 text-2xs font-semibold",
                      healthColors[customer.health]
                    )}
                  >
                    {healthLabels[customer.health]}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-grey-400">
                  {customer.lastActivity}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-grey-500"
                >
                  No customers match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-[6px] shadow-dropdown w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-black" />
                <h2 className="text-base font-semibold text-black">
                  Add New Customer
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-[4px] p-1 text-grey-400 hover:bg-grey-50 hover:text-black transition-colors duration-150"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-grey-600 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Jane Smith"
                  className="w-full h-10 px-3 border border-grey-300 rounded-sm bg-white text-sm placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-grey-600 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. jane@company.com"
                  className="w-full h-10 px-3 border border-grey-300 rounded-sm bg-white text-sm placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-grey-600 mb-1.5">
                  Company
                </label>
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full h-10 px-3 border border-grey-300 rounded-sm bg-white text-sm placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-grey-600 mb-1.5">
                  Monthly Revenue
                </label>
                <input
                  type="number"
                  value={newMrr}
                  onChange={(e) => setNewMrr(e.target.value)}
                  placeholder="$0"
                  className="w-full h-10 px-3 border border-grey-300 rounded-sm bg-white text-sm placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-grey-600 mb-1.5">
                  Health Status
                </label>
                <select
                  value={newHealth}
                  onChange={(e) => setNewHealth(e.target.value)}
                  className="w-full h-10 px-3 border border-grey-300 rounded-sm bg-white text-sm text-black transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="healthy">Healthy</option>
                  <option value="at-risk">At Risk</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleAddCustomer}
                disabled={!newName.trim() || !newCompany.trim()}
                className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-sm bg-black text-white hover:bg-grey-800 transition-colors duration-150 shadow-button disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
