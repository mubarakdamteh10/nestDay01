import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { TopicsController } from './topics.controller';

@Module({
    imports: [ConfigModule],
    controllers: [TopicsController],
    providers: [],
})
export class TopicsModule {}
