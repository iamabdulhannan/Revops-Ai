"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { complianceDepartments } from "@/data/compliance-data";

export type ReportConfig = {
  framework: string;
  departments: string[];
  dateRange: string;
  includeRecommendations: boolean;
};

interface ReportGenerateModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (config: ReportConfig) => void;
}

const frameworkOptions = ["All", "GDPR", "PTA", "SECP", "FBR", "ESG"];
const dateRangeOptions = ["Last Quarter", "Last 6 Months", "Last Year"];

const inputClassName =
  "h-10 px-3 border border-grey-300 rounded-sm bg-white text-sm focus:border-black focus:ring-1 focus:ring-black outline-none w-full";

export function ReportGenerateModal({
  open,
  onClose,
  onGenerate,
}: ReportGenerateModalProps) {
  const [framework, setFramework] = useState("All");
  const [departments, setDepartments] = useState<string[]>(
    complianceDepartments.map((d) => d.name)
  );
  const [dateRange, setDateRange] = useState("Last Quarter");
  const [includeRecommendations, setIncludeRecommendations] = useState(true);

  const toggleDepartment = (name: string) => {
    setDepartments((prev) =>
      prev.includes(name) ? prev.filter((d) => d !== name) : [...prev, name]
    );
  };

  const handleSubmit = () => {
    onGenerate({
      framework,
      departments,
      dateRange,
      includeRecommendations,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Generate Compliance Report"
      size="md"
    >
      <div className="space-y-5">
        {/* Framework */}
        <div>
          <label className="block text-xs font-medium text-grey-600 mb-1.5">
            Framework
          </label>
          <select
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
            className={inputClassName}
          >
            {frameworkOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Departments */}
        <div>
          <label className="block text-xs font-medium text-grey-600 mb-1.5">
            Departments
          </label>
          <div className="space-y-2">
            {complianceDepartments.map((dept) => (
              <label
                key={dept.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={departments.includes(dept.name)}
                  onChange={() => toggleDepartment(dept.name)}
                  className="h-4 w-4 rounded border-grey-300 text-black focus:ring-black"
                />
                <span className="text-sm text-grey-700">{dept.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date range */}
        <div>
          <label className="block text-xs font-medium text-grey-600 mb-1.5">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={inputClassName}
          >
            {dateRangeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Include recommendations */}
        <div>
          <label className="block text-xs font-medium text-grey-600 mb-1.5">
            Include Recommendations
          </label>
          <Toggle
            checked={includeRecommendations}
            onChange={setIncludeRecommendations}
            label="Add AI-generated recommendations to the report"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Generate
          </Button>
        </div>
      </div>
    </Modal>
  );
}
