import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
