import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { Producer } from './entities/producer.entity';
import { CpfCnpjMiddleware } from 'src/middleware/checkCNPJCPF';

@Module({
  imports: [TypeOrmModule.forFeature([Producer])],
  providers: [ProducerService],
  controllers: [ProducerController],
})
export class ProducerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CpfCnpjMiddleware)
      .forRoutes({ path: 'producer', method: RequestMethod.POST });
  }
}
