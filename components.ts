interface ComponentDeclare {
  name: string;
  dependencies: string[];
  devDependencies?: string[];
  componentDependencies?: string[];
  files: {
    path: string;
    source: string;
  }[];
  styles?: string;
}

const COMPONENTS_DECLARE: Record<string, ComponentDeclare> = {
  config: {
    name: "config",
    // dependencies: ["clsx", "tailwind-merge"],
    dependencies: [],
    devDependencies: [],
    files: [
      {
        path: "tailwind.config.js",
        source: "tailwind.config.js",
      },
      {
        path: "postcss.config.js",
        source: "postcss.config.js",
      },
      {
        path: "src/index.css",
        source: "src/index.css",
      },
      {
        path: "src/utilities/lib/utils.ts",
        source: "src/utilities/lib/utils.ts",
      },
    ],
  },
  button: {
    name: "Button",
    dependencies: ["class-variance-authority", "@radix-ui/react-slot"],
    files: [
      {
        path: "src/components/ui/button.tsx",
        source: "src/components/ui/button.tsx",
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
        source: "src/components/ui/alert.tsx",
      },
    ],
  },
  card: {
    name: "Card",
    componentDependencies: ["button", "alert"],
    dependencies: [],
    files: [
      {
        path: "src/components/ui/card.tsx",
        source: "src/components/ui/card.tsx",
      },
    ],
  },
};

export default COMPONENTS_DECLARE;
