import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Badge } from "./badge";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "./dropdown-menu";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A responsive, accessible data table built with **shadcn/ui**. \n\n" +
          "Use this component to display large amounts of structured data. It supports interactive rows, badging, and contextual dropdown actions.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// We use a custom render function to show the full table structure
export const Default: Story = {
  render: () => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV-001</TableCell>
            <TableCell>Acme Corp</TableCell>
            <TableCell>
              <Badge>Paid</Badge>
            </TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV-002</TableCell>
            <TableCell>Stark Enterprises</TableCell>
            <TableCell>
              <Badge variant="destructive">Overdue</Badge>
            </TableCell>
            <TableCell className="text-right">$8,400.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

export const InteractiveRows: Story = {
  render: () => {
    const [rows, setRows] = React.useState([
      {
        id: "INV-001",
        customer: "Acme Corp",
        status: "Paid",
        amount: "$2,500.00",
      },
      {
        id: "INV-002",
        customer: "Stark Enterprises",
        status: "Overdue",
        amount: "$8,400.00",
      },
    ]);

    const handleAddRow = () => {
      const nextId =
        rows.length > 0
          ? parseInt(rows[rows.length - 1].id.split("-")[1]) + 1
          : 1;
      const formattedId = `INV-${nextId.toString().padStart(3, "0")}`;

      setRows([
        ...rows,
        {
          id: formattedId,
          customer: "New Client",
          status: "Pending",
          amount: "$1,000.00",
        },
      ]);
    };

    // 3. Logic to remove a specific row by its ID
    const handleRemoveRow = (idToRemove: string) => {
      setRows(rows.filter((row) => row.id !== idToRemove));
    };

    return (
      <div className="space-y-4">
        {/* Toolbar for table actions */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Invoices</h3>
          <button
            onClick={handleAddRow}
            className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90"
          >
            Add Row
          </button>
        </div>

        {/* The Table Component */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[100px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No invoices found.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.status === "Overdue" ? "destructive" : "default"
                        }
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{row.amount}</TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={() => handleRemoveRow(row.id)}
                        className="text-sm font-medium text-red-500 transition-colors hover:text-red-700"
                      >
                        Remove
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  },
};

export const WithDropdownActions: Story = {
  render: () => {
    const data = [
      {
        id: "INV-001",
        customer: "Acme Corp",
        status: "Paid",
        amount: "$2,500.00",
      },
      {
        id: "INV-002",
        customer: "Stark Enterprises",
        status: "Overdue",
        amount: "$8,400.00",
      },
      {
        id: "INV-003",
        customer: "Wayne Industries",
        status: "Pending",
        amount: "$1,200.00",
      },
    ];

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[150px]">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.status === "Overdue" ? "destructive" : "default"
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => navigator.clipboard.writeText(row.id)}
                        >
                          Copy invoice ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>
                          View payment details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-900/50">
                          Delete invoice
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};
