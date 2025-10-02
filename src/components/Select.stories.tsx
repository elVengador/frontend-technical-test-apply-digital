import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { Select } from "./Select";

const meta = {
  component: Select,
  title: "Select",
  tags: ["autodocs"],
  args: {},
  decorators: [
    (Story, params) => {
      const [selectedOption, setSelectedOption] = useState("");

      return (
        <Story
          {...params}
          args={{
            ...params.args,
            label: selectedOption,
            fnChange: setSelectedOption,
          }}
        />
      );
    },
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: "option 1", value: "option-1" },
      { label: "option 2", value: "option-2" },
      { label: "option 3", value: "option-3" },
    ],
    label: "",
    fnChange: () => {},
  },
};
