import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../components/ui/button';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['primary', 'default', 'dashed', 'link', 'text'],
        },
        size: {
            control: 'select',
            options: ['large', 'middle', 'small'],
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        type: 'primary',
        children: 'Primary Button',
    },
};

export const Secondary: Story = {
    args: {
        type: 'default',
        children: 'Secondary Button',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
        children: 'Large Button',
    },
};

