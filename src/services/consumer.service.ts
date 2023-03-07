import { Injectable } from '@nestjs/common';
import { LoggerService } from '@app/logger/services/logger.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { ExchangeRabbit } from '../enums/exchange-rabbit';
import { QueueRabbit } from '../enums/queue-rabbit';

@Injectable()
export class ConsumerService {
  constructor(private readonly logger: LoggerService) {}

  @RabbitSubscribe({
    exchange: ExchangeRabbit.exchangeExample,
    routingKey: QueueRabbit.exampleQueue,
  })
  public async pubSubHandler(payload: { msg: string }): Promise<void> {
    this.logger.log(payload.msg);

    return;
  }
}
