import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtModuleAsyncConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    secret: config.get<string>('JWT_SECRET'),
  }),
};
