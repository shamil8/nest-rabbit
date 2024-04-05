import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@app/logger/logger.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { rabbitConfig } from './config/rabbit.config';
import { RabbitListener } from './listeners/rabbit.listener';
import { ConsumerService } from './services/consumer.service';
import { ProducerService } from './services/producer.service';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: rabbitConfig,
    }),
  ],
  providers: [
    // services
    ProducerService,
    ConsumerService,

    // listeners
    RabbitListener,
  ],
  exports: [ProducerService],
})
export class RabbitModule {}
