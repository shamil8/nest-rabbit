import { Injectable } from '@nestjs/common';

import config from 'src/config';
import { ProducerService } from '../services/producer.service';
import { QueueRabbit } from '../enums/queue-rabbit';
import { ExchangeRabbit } from '../enums/exchange-rabbit';

@Injectable()
export class RabbitListener {
  constructor(private readonly producerService: ProducerService) {
    this.initRabbitExamples();
  }

  initRabbitExamples(): void {
    this.producerService.addMessage(
      QueueRabbit.exampleQueue,
      { msg: `Hello from ${config.appName}` },
      ExchangeRabbit.exchangeExample,
    );
  }
}
