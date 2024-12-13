import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { Producer } from './entities/producer.entity';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>,
  ) {}

  create(createProducerDto: CreateProducerDto): Promise<Producer> {
    // const producer = this.producerRepository.create(createProducerDto);
    // return this.producerRepository.save(producer);

    const existingProducer = this.producerRepository.findOne({
      where: { cpfCnpj: createProducerDto.cpfCnpj },
    });

    const wrongCpfCnpjLength =
      createProducerDto.cpfCnpj.length < 11 ||
      createProducerDto.cpfCnpj.length > 14;

    if (wrongCpfCnpjLength) {
      throw new BadRequestException(
        'CPF/CNPJ must have between 11 and 14 numbers.',
      );
    }

    return this.producerRepository.save(createProducerDto);
  }

  findAll(): Promise<Producer[]> {
    return this.producerRepository.find();
  }

  findOne(id: number): Promise<Producer> {
    //@ts-expect-error
    return this.producerRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateProducerDto: UpdateProducerDto,
  ): Promise<Producer> {
    await this.producerRepository.update(id, updateProducerDto);
    //@ts-expect-error
    return this.producerRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.producerRepository.delete(id);
  }

  async findOneByCpfCnpj(cpfCnpj: string): Promise<Producer> {
    return this.producerRepository.findOne({ where: { cpfCnpj } });
  }
}
