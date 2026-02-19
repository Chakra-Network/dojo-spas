import {
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";
import type { Contact, LifecycleStage } from "../lib/types";
import { getInitials, getStageColor, getStageLabel, formatDate } from "../lib/utils";

interface ContactsCRMProps {
  contacts: Contact[];
  search: string;
  filterStage: LifecycleStage | "all";
  onSearchChange: (q: string) => void;
  onFilterChange: (stage: LifecycleStage | "all") => void;
  onSelectContact: (id: string) => void;
  onUpdateContact: (contact: Contact) => void;
}

const stages: (LifecycleStage | "all")[] = ["all", "subscriber", "lead", "mql", "sql", "customer"];

export default function ContactsCRM({
  contacts,
  search,
  filterStage,
  onSearchChange,
  onFilterChange,
  onSelectContact,
  onUpdateContact,
}: ContactsCRMProps) {
  const filtered = contacts.filter((c) => {
    const matchSearch =
      !search ||
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase());
    const matchStage = filterStage === "all" || c.lifecycleStage === filterStage;
    return matchSearch && matchStage;
  });

  const stageCounts = contacts.reduce(
    (acc, c) => {
      acc[c.lifecycleStage] = (acc[c.lifecycleStage] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="p-6 space-y-4 text-gray-900">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Contacts CRM</h1>
        <p className="text-sm text-gray-500 mt-0.5">{contacts.length} contacts · {filtered.length} shown</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, email, or company..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-gray-400" />
          {stages.map((s) => (
            <button
              key={s}
              onClick={() => onFilterChange(s)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                filterStage === s
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
              }`}
            >
              {s === "all" ? `All (${contacts.length})` : `${getStageLabel(s)} (${stageCounts[s] || 0})`}
            </button>
          ))}
        </div>
      </div>

      {/* Contact grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stage</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Activity</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Source</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors cursor-pointer"
                onClick={() => onSelectContact(c.id)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1b2a4a] flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-white">{getInitials(c.firstName, c.lastName)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{c.firstName} {c.lastName}</p>
                      <p className="text-xs text-gray-400 truncate">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-gray-700">{c.company}</p>
                  <p className="text-xs text-gray-400">{c.jobTitle}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex items-center">
                      <span className={`w-2 h-2 rounded-full ${getStageColor(c.lifecycleStage)}`} />
                    </span>
                    <select
                      value={c.lifecycleStage}
                      onChange={(e) => {
                        e.stopPropagation();
                        onUpdateContact({ ...c, lifecycleStage: e.target.value as LifecycleStage });
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs bg-transparent border-none cursor-pointer text-gray-700 focus:outline-none focus:ring-0 p-0"
                    >
                      {(["subscriber", "lead", "mql", "sql", "customer"] as LifecycleStage[]).map((s) => (
                        <option key={s} value={s}>{getStageLabel(s)}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600">{c.owner}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{formatDate(c.lastActivity)}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{c.source}</td>
                <td className="px-4 py-3">
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">
                  No contacts match your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
