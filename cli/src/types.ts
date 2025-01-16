export interface PackageJson {
  name?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: any;
}

export interface DependencyConfig {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export interface ComponentConfig {
  name: string;
  dependencies: string[];
  devDependencies?: string[];
  componentDependencies?: string[];
  files: {
    path: string;
    content: string;
  }[];
  styles?: string;
}
export interface ComponentDeclare {
  name: string;
  dependencies: string[];
  componentDependencies?: string[];
  files: {
    path: string;
    source: string;
  }[];
  styles?: string;
}

export interface Registry {
  [key: string]: ComponentConfig;
}
