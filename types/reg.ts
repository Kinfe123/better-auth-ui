type FileData = {
  path: string;
  content: string;
  target: string;
  type: "registry:component" | "registry:lib";
};

export type RegisteryData = {
  id: string;
  name: string;
  type: "registry:component";
  title: string;
  description?: string;
  registryDependencies: string[];
  files: FileData[];
};
