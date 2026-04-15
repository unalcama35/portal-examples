import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button", // This is the folder structure in the Storybook sidebar
  component: Button,
  tags: ["autodocs"], // Automatically generates the documentation table
  argTypes: {
    variant: {
      control: "select",
      description: "The visual style of the button.",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      description: "The size of the button.",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// The default state
export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Save Changes",
  },
};

// The destructive state
export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "default",
    children: "Delete Record",
  },
};

// The outline state
export const Outline: Story = {
  args: {
    variant: "outline",
    size: "default",
    children: "Cancel",
  },
};
