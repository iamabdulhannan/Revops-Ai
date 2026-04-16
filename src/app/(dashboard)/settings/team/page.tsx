"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/cn";
import { X, UserPlus } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
  initials: string;
  status: "Active" | "Invited";
}

const initialMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "Owner",
    initials: "JD",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@company.com",
    role: "Admin",
    initials: "SC",
    status: "Active",
  },
  {
    id: "3",
    name: "Michael West",
    email: "michael@company.com",
    role: "Member",
    initials: "MW",
    status: "Active",
  },
  {
    id: "4",
    name: "Priya Patel",
    email: "priya@company.com",
    role: "Member",
    initials: "PP",
    status: "Invited",
  },
];

function getInitialsFromEmail(email: string): string {
  const local = email.split("@")[0];
  const parts = local.split(/[._-]/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return local.slice(0, 2).toUpperCase();
}

function roleBadgeClasses(role: string): string {
  switch (role) {
    case "Owner":
      return "bg-black text-white";
    case "Admin":
      return "bg-grey-700 text-white";
    case "Member":
    default:
      return "bg-grey-100 text-grey-700";
  }
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialMembers);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Owner" | "Admin" | "Member">("Member");

  function handleSendInvite() {
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteEmail.split("@")[0],
      email: inviteEmail.trim(),
      role: inviteRole,
      initials: getInitialsFromEmail(inviteEmail.trim()),
      status: "Invited",
    };

    setTeamMembers((prev) => [...prev, newMember]);
    setInviteEmail("");
    setInviteRole("Member");
    setShowInviteModal(false);
  }

  function handleRemove(id: string) {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <PageHeader title="Team Members" subtitle="Manage your team and permissions">
        <button
          type="button"
          onClick={() => setShowInviteModal(true)}
          className="inline-flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium rounded-sm bg-black text-white hover:bg-grey-800 transition-colors duration-150 shadow-button"
        >
          <UserPlus className="h-4 w-4" />
          Invite Member
        </button>
      </PageHeader>

      {/* Settings sub-navigation */}
      <div className="flex items-center gap-0 border-b border-grey-200 mb-6">
        {[
          { label: "General", href: "/settings", active: false },
          { label: "Team", href: "/settings/team", active: true },
          { label: "Billing", href: "/settings/billing", active: false },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "relative px-4 pb-3 pt-1 text-sm font-medium transition-colors duration-150",
              tab.active
                ? "text-black font-semibold"
                : "text-grey-500 hover:text-grey-700"
            )}
          >
            {tab.label}
            {tab.active && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </Link>
        ))}
      </div>

      <div className="rounded-[6px] bg-white shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-grey-500">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-grey-500">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-grey-500">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-grey-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {teamMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-grey-50 transition-colors duration-100"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center shrink-0">
                        <span className="text-2xs font-semibold text-white">
                          {member.initials}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black">
                          {member.name}
                        </p>
                        <p className="text-xs text-grey-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-pill px-2 py-0.5 text-2xs font-semibold",
                        roleBadgeClasses(member.role)
                      )}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-medium",
                        member.status === "Active"
                          ? "text-success"
                          : "text-warning"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          member.status === "Active"
                            ? "bg-success"
                            : "bg-warning"
                        )}
                      />
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      <button
                        type="button"
                        className="text-xs text-grey-500 hover:text-black transition-colors duration-150"
                      >
                        Edit
                      </button>
                      {member.role !== "Owner" && (
                        <button
                          type="button"
                          onClick={() => handleRemove(member.id)}
                          className="text-xs text-grey-500 hover:text-danger transition-colors duration-150"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-[6px] bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-black">Invite Team Member</h3>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="text-grey-400 hover:text-grey-600 transition-colors duration-150"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="invite-email"
                  className="text-xs font-medium text-grey-700 uppercase tracking-wider"
                >
                  Email Address
                </label>
                <input
                  id="invite-email"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="h-10 w-full px-3 border border-grey-300 rounded-sm bg-white text-base placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="invite-role"
                  className="text-xs font-medium text-grey-700 uppercase tracking-wider"
                >
                  Role
                </label>
                <select
                  id="invite-role"
                  value={inviteRole}
                  onChange={(e) =>
                    setInviteRole(e.target.value as "Owner" | "Admin" | "Member")
                  }
                  className="h-10 w-full px-3 border border-grey-300 rounded-sm bg-white text-sm transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="Owner">Owner</option>
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-sm bg-white text-black border border-grey-300 hover:bg-grey-50 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendInvite}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-sm bg-black text-white hover:bg-grey-800 transition-colors duration-150"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
