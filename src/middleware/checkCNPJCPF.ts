import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProducerService } from '../producer/producer.service';

@Injectable()
export class CpfCnpjMiddleware implements NestMiddleware {
  constructor(private readonly producerService: ProducerService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { cpfCnpj } = req.body;

    if (cpfCnpj.length < 11 || cpfCnpj.length > 14) {
      throw new BadRequestException(
        'CPF/CNPJ must have between 11 and 14 numbers.',
      );
    }

    next();
  }
}
