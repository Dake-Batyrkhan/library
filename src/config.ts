const config: { port: number; mongodbUrl: string } = {
  port: Number(process.env.PORT) ?? 3000,
  mongodbUrl: process.env.MONGODB_URL ?? '',
};

export default config;
