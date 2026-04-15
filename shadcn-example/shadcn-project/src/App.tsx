import { useState } from "react";
import {
  FileText,
  Truck,
  BookOpen,
  Bell,
  User,
  Search,
  Package2,
} from "lucide-react";

import { Button, buttonVariants } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

// Dummy Data for the table
const invoices = [
  {
    id: "INV-001",
    customer: "Acme Corp",
    amount: "$2,500.00",
    status: "Paid",
    date: "2026-04-10",
  },
  {
    id: "INV-002",
    customer: "Global Industries",
    amount: "$1,200.00",
    status: "Pending",
    date: "2026-04-12",
  },
  {
    id: "INV-003",
    customer: "Stark Enterprises",
    amount: "$8,400.00",
    status: "Overdue",
    date: "2026-03-25",
  },
  {
    id: "INV-004",
    customer: "Wayne Tech",
    amount: "$450.00",
    status: "Paid",
    date: "2026-04-14",
  },
  {
    id: "INV-005",
    customer: "Cyberdyne Systems",
    amount: "$12,000.00",
    status: "Pending",
    date: "2026-04-15",
  },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // Simple filter logic for the table
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* 1. SIDEBAR */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Your Company</span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {/* Selected State (Invoices) */}
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <FileText className="h-4 w-4" />
                Invoices
              </a>
              {/* Unselected States */}
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Truck className="h-4 w-4" />
                Despatch
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <BookOpen className="h-4 w-4" />
                Ledger
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex flex-col">
        {/* NAVBAR */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between md:justify-end">
          {/* Mobile menu placeholder for future (hidden on desktop) */}
          <div className="md:hidden font-bold">Menu</div>

          <div className="flex items-center gap-4">
            {/* Notification Icon with Red Dot */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="sr-only">Toggle notifications</span>
            </Button>

            {/* Clickable Username Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({
                  variant: "secondary",
                  className: "flex gap-2 rounded-full",
                })}
              >
                <User className="h-4 w-4" />
                <span className="hidden md:inline-flex">Jane Doe</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Invoices</h1>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border p-4 shadow-sm">
            {/* Filter Input */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Filter by customer or ID..."
                className="w-full appearance-none bg-background pl-8 shadow-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Data Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>
                        {/* Dynamic Badge coloring based on status */}
                        <Badge
                          variant={
                            invoice.status === "Paid"
                              ? "default"
                              : invoice.status === "Overdue"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {invoice.amount}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}
