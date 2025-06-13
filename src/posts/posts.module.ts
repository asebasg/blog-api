import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [PrismaModule],
})
export class PostsModule {}
