// Brokers comparison data table.
//
// Built on TanStack Table v8 (sorting, filtering) + shadcn Table primitives.
// The page wraps this with editorial copy; the table itself is the working
// comparison tool: sort by name or tier, filter by tier and account-type
// chips, search by name. Each row expands to show "Best for" and "Watch out".
//
// The visual language uses the codified tokens (font-display, text-wine,
// border-border-warm, etc.) so when we swap Carefolio tokens later, this
// component follows automatically.

import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  ArrowUpRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  Search,
  AlertTriangle,
} from "lucide-react";
import { BROKERS, type Broker, type BrokerTier } from "../data/brokers";
import { BrokerLink } from "./branding/BrokerLink";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const TIER_LABELS: Record<BrokerTier, string> = {
  primary: "Shortlist",
  ireland: "Ireland",
  uk: "UK",
  honourable: "Honourable",
  avoid: "Avoid",
};

const TIER_BG: Record<BrokerTier, string> = {
  primary: "bg-wine text-white",
  ireland: "bg-peach text-ink",
  uk: "bg-cream-deep text-ink-soft",
  honourable: "bg-white text-muted-warm border border-border-warm",
  avoid: "bg-[#FBE8E5] text-[#5C1F0F]",
};

const TIER_ORDER: BrokerTier[] = ["primary", "ireland", "uk", "honourable", "avoid"];

export function BrokersTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [activeTiers, setActiveTiers] = useState<Set<BrokerTier>>(
    new Set(["primary", "ireland"])
  );
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Filter brokers by active tier chips
  const filteredBrokers = useMemo(
    () => BROKERS.filter((b) => activeTiers.has(b.tier)),
    [activeTiers]
  );

  const columns = useMemo<ColumnDef<Broker>[]>(
    () => [
      {
        id: "expand",
        header: () => null,
        cell: ({ row }) => {
          const expanded = expandedRows.has(row.original.id);
          return (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleRow(row.original.id);
              }}
              className="rounded p-1 transition-colors hover:bg-cream-deep"
              aria-label={expanded ? "Collapse row" : "Expand row"}
            >
              {expanded ? (
                <ChevronDown className="size-4 text-muted-warm" />
              ) : (
                <ChevronRight className="size-4 text-muted-warm" />
              )}
            </button>
          );
        },
        size: 32,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <SortableHeader column={column}>Broker</SortableHeader>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span
              className="font-medium text-ink"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {row.original.name}
            </span>
            <span className="mt-0.5 text-xs text-muted-warm">
              {row.original.regulator}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "tier",
        header: ({ column }) => (
          <SortableHeader column={column}>Tier</SortableHeader>
        ),
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${TIER_BG[row.original.tier]}`}
          >
            {TIER_LABELS[row.original.tier]}
          </span>
        ),
        sortingFn: (a, b) =>
          TIER_ORDER.indexOf(a.original.tier) -
          TIER_ORDER.indexOf(b.original.tier),
        meta: { hideOnMobile: true },
      },
      {
        accessorKey: "accountTypes",
        header: "Accounts",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.accountTypes.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-md border border-border-warm bg-cream px-1.5 py-0.5 text-xs text-ink-soft"
              >
                {t}
              </span>
            ))}
          </div>
        ),
        enableSorting: false,
        meta: { hideBelowLg: true },
      },
      {
        accessorKey: "pricing",
        header: "Pricing",
        cell: ({ row }) => (
          <span className="text-sm text-ink-soft">{row.original.pricing}</span>
        ),
        enableSorting: false,
        meta: { hideBelowLg: true },
      },
      {
        id: "visit",
        header: () => <span className="sr-only">Visit</span>,
        cell: ({ row }) => (
          <BrokerLink
            href={row.original.url}
            affiliateHref={row.original.affiliateUrl}
            className="inline-flex items-center gap-1 text-sm font-medium text-wine hover:underline"
          >
            Visit
            <ArrowUpRight className="size-3.5" />
          </BrokerLink>
        ),
        enableSorting: false,
        size: 80,
      },
    ],
    [expandedRows]
  );

  const table = useReactTable({
    data: filteredBrokers,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, value) => {
      const q = String(value).toLowerCase();
      return (
        row.original.name.toLowerCase().includes(q) ||
        row.original.regulator.toLowerCase().includes(q) ||
        row.original.bestFor.toLowerCase().includes(q)
      );
    },
  });

  function toggleRow(id: string) {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleTier(tier: BrokerTier) {
    setActiveTiers((prev) => {
      const next = new Set(prev);
      if (next.has(tier)) next.delete(tier);
      else next.add(tier);
      return next;
    });
  }

  return (
    <div>
      {/* ─── Filters bar ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {TIER_ORDER.map((tier) => {
            const active = activeTiers.has(tier);
            return (
              <button
                key={tier}
                onClick={() => toggleTier(tier)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? "bg-ink text-white"
                    : "border border-border-warm bg-white text-ink-soft hover:border-ink/40"
                }`}
              >
                {TIER_LABELS[tier]}
                {active ? " ·" : ""} {active ? countByTier(tier) : ""}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-warm" />
          <input
            type="search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search by name or regulator…"
            className="w-full rounded-full border border-border-warm bg-white py-2 pl-10 pr-3 text-sm text-ink placeholder:text-muted-warm focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20"
          />
        </div>
      </div>

      {/* ─── Table ───────────────────────────────────────────────── */}
      <div className="mt-6 rounded-2xl border border-border-warm bg-white">
        <Table className="w-full">
          <TableHeader className="bg-cream-deep">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-border-warm hover:bg-cream-deep">
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as
                    | { hideOnMobile?: boolean; hideBelowLg?: boolean }
                    | undefined;
                  const hideClass = meta?.hideBelowLg
                    ? "hidden lg:table-cell"
                    : meta?.hideOnMobile
                      ? "hidden sm:table-cell"
                      : "";
                  return (
                    <TableHead
                      key={header.id}
                      className={`text-ink-soft ${hideClass}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-10 text-muted-warm">
                  No brokers match the current filters.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                const expanded = expandedRows.has(row.original.id);
                return (
                  <>
                    <TableRow
                      key={row.id}
                      onClick={() => toggleRow(row.original.id)}
                      className="cursor-pointer border-border-warm hover:bg-cream"
                    >
                      {row.getVisibleCells().map((cell) => {
                        const meta = cell.column.columnDef.meta as
                          | { hideOnMobile?: boolean; hideBelowLg?: boolean }
                          | undefined;
                        const hideClass = meta?.hideBelowLg
                          ? "hidden lg:table-cell"
                          : meta?.hideOnMobile
                            ? "hidden sm:table-cell"
                            : "";
                        return (
                          <TableCell
                            key={cell.id}
                            className={`align-top ${hideClass}`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {expanded && (
                      <TableRow
                        key={`${row.id}-detail`}
                        className="border-border-warm bg-cream/60 hover:bg-cream/60"
                      >
                        <TableCell colSpan={columns.length} className="py-5">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <Detail
                              label="Best for"
                              text={row.original.bestFor}
                            />
                            <Detail
                              label="Watch out"
                              text={row.original.watchOut}
                              warning
                            />
                            <Detail
                              label="Available to"
                              text={row.original.passport}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <p className="mt-3 text-xs text-muted-warm">
        Showing {table.getRowModel().rows.length} of {BROKERS.length} brokers ·
        Click a row to expand · Sortable columns marked with arrows
      </p>
    </div>
  );
}

/* ──────────────────────────────  Helpers  ──────────────────────────────── */

function countByTier(tier: BrokerTier): number {
  return BROKERS.filter((b) => b.tier === tier).length;
}

function SortableHeader({
  column,
  children,
}: {
  column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (desc?: boolean) => void };
  children: React.ReactNode;
}) {
  const sorted = column.getIsSorted();
  return (
    <button
      onClick={() => column.toggleSorting(sorted === "asc")}
      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-soft transition-colors hover:text-wine"
    >
      {children}
      {sorted === "asc" ? (
        <ArrowUp className="size-3" />
      ) : sorted === "desc" ? (
        <ArrowDown className="size-3" />
      ) : (
        <ArrowUpDown className="size-3 opacity-40" />
      )}
    </button>
  );
}

function Detail({
  label,
  text,
  warning = false,
}: {
  label: string;
  text: string;
  warning?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      {warning ? (
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-peach" />
      ) : (
        <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-wine" />
      )}
      <div>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-warm">
          {label}
        </div>
        <div className="mt-1 text-ink-soft">{text}</div>
      </div>
    </div>
  );
}
