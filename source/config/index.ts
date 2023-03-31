interface AuthSettings {
  secret: string;
  expiredAt: string;
}

interface Environment {
  port: number;
  production: boolean;
  auth: AuthSettings;
}

export const environment: Environment = {
  port: process.env.PORT ? Number(process.env.PORT) : 3030,
  production: process.env.NODE_ENV === "production",
  auth: {
    secret: process.env.AUTH_SECRET ?? String(),
    expiredAt: process.env.AUTH_EXPIRED_AT ?? String(),
  },
};
