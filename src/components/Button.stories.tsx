import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./Button";

const meta = {
  component: Button,
  title: "Button",
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "default outline button",
    onClick: () => console.log("click"),
  },
};

export const Solid: Story = {
  args: {
    children: "solid button",
    variant: "solid",
    onClick: () => console.log("click"),
  },
};
