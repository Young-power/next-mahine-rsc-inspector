export type resultType = {
  projectName: string;
  projectRoot: string;
  appDir: string;
  folders: Record<string, {
    server: number;
    client: number;
  }>;
  total: number;
  client: number;
  server: number;
  ratioServer: number;
  ratioClient: number;
} | null

