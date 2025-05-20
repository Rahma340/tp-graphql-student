import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  create(student: Partial<Student>): Promise<Student> {
    return this.studentRepository.save(student);
  }

  async update(id: number, updatedData: Partial<Student>): Promise<Student> {
    await this.findOne(id); // Throw if not found
    await this.studentRepository.update(id, updatedData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id); // Throw if not found
    await this.studentRepository.delete(id);
    return true;
  }
}
