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

import { Button } from "@base-ui/react/button";
import { Menu } from "@base-ui/react/menu";

import "./App.css";

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

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-header">
          <Package2 size={24} />
          <span>Your Company</span>
        </div>
        <nav className="nav-menu">
          <a href="#" className="nav-item active">
            <FileText size={18} /> Invoices
          </a>
          <a href="#" className="nav-item">
            <Truck size={18} /> Despatch
          </a>
          <a href="#" className="nav-item">
            <BookOpen size={18} /> Ledger
          </a>
        </nav>
      </div>

      {/* MAIN WRAPPER */}
      <div>
        {/* NAVBAR */}
        <header className="navbar">
          <Button className="btn-icon">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </Button>

          <Menu.Root>
            <Menu.Trigger className="btn-user">
              <User size={16} />
              Jane Doe
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup className="menu-popup">
                  <div className="menu-label">My Account</div>
                  <div className="menu-separator" />
                  <Menu.Item className="menu-item">Settings</Menu.Item>
                  <Menu.Item className="menu-item">Support</Menu.Item>
                  <div className="menu-separator" />
                  <Menu.Item className="menu-item">Logout</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="main-content">
          <h1 className="page-title">Invoices</h1>

          <div className="card">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="search"
                placeholder="Filter by customer or ID..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", padding: "32px" }}
                    >
                      No results found.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td style={{ fontWeight: 500 }}>{invoice.id}</td>
                      <td>{invoice.customer}</td>
                      <td>{invoice.date}</td>
                      <td>
                        <span
                          className={`badge badge-${
                            invoice.status === "Paid"
                              ? "default"
                              : invoice.status === "Overdue"
                                ? "destructive"
                                : "secondary"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="text-right">{invoice.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
