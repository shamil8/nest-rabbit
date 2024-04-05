import { Injectable } from '@nestjs/common';
import { LoggerService } from '@app/logger/services/logger.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { ExchangeRabbit } from '../enums/exchange-rabbit';

@Injectable()
export class ProducerService {
  constructor(
    private readonly logger: LoggerService,
    private readonly amqpConnection: AmqpConnection,
  ) {}
  public async addMessage<T>(
    queue: string,
    request: T,
    exchange = ExchangeRabbit.appDirect,
  ): Promise<boolean> {
    return this.amqpConnection.publish(exchange, queue, request);
  }
}
