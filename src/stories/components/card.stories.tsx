import type { Meta, StoryObj } from "@storybook/react";

import Card from "../../components/ui/card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "default", "dashed", "link", "text"],
    },
    size: {
      control: "select",
      options: ["large", "middle", "small"],
    },
    color: {
      control: "select",
      options: [
        "danger",
        "primary",
        "default",
        "blue",
        "cyan",
        "gold",
        "green",
        "lime",
        "magenta",
        "orange",
        "pink",
        "purple",
        "red",
        "yellow",
        "volcano",
        "geekblue",
      ],
    },
    variant: {
      control: "select",
      options: ["dashed", "link", "text", "outlined", "solid", "filled"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {};

export const Default: Story = {};

export const Large: Story = {};
