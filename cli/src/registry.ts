import { ComponentConfig } from "./types";

const COMPONENTS_REGISTRY: Record<string, ComponentConfig> = {
  config: {
    name: "config",
    dependencies: [],
    files: [
      {
        path: "tailwind.config.js",
        content: `export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
`,
      },
      {
        path: "postcss.config.js",
        content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,
      },
      {
        path: "src/index.css",
        content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
    padding: 0;
    margin: 0;
}`,
      },
      {
        path: "src/utilities/lib/utils.ts",
        content: `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
      },
    ],
  },

  button: {
    name: "Button",
    dependencies: ["class-variance-authority", "@radix-ui/react-slot"],
    files: [
      {
        path: "src/components/ui/button.tsx",
        content: `import React from "react";
import type { ButtonProps as AntButtonProps } from "antd";
import { Button as AntButton } from "antd";
import { ButtonColorType } from "antd/es/button";

export interface ButtonProps extends Omit<AntButtonProps, "type"> {
  type?: "primary" | "default" | "dashed" | "link" | "text";
  className?: string;
  color?: ButtonColorType;
}

const Button: React.FC<ButtonProps> = ({
  type = "primary",
  size = "middle",
  children,
  ...props
}) => {
  return (
    <AntButton type={type} variant="solid" size={size} {...props}>
      {children}
    </AntButton>
  );
};

export default Button;
`,
      },
    ],
  },

  alert: {
    name: "Alert",
    dependencies: [],
    componentDependencies: ["button"],
    files: [
      {
        path: "src/components/ui/alert.tsx",
        content: `import Button from "./button";

export default function Alert() {
  return <Button>Alert</Button>;
}
`,
      },
    ],
  },

  card: {
    name: "Card",
    dependencies: [],
    componentDependencies: ["button", "alert"],
    files: [
      {
        path: "src/components/ui/card.tsx",
        content: `import Alert from "./alert";
import Button from "./button";

export default function Card() {
  return (
    <>
      <Button>Alert</Button>
      <Alert />
    </>
  );
}
`,
      },
    ],
  },
};

export default COMPONENTS_REGISTRY;
