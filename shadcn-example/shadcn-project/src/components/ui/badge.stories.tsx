import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      description: "The visual style of the badge.",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Paid",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Overdue",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Pending",
  },
};
