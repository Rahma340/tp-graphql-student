import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Student } from './student.entity';
import { StudentService } from './student.service';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [Student])
  students(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Query(() => Student)
  student(@Args('id', { type: () => Int }) id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Mutation(() => Student)
  createStudent(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('phone', { nullable: true }) phone?: string,
  ): Promise<Student> {
    return this.studentService.create({ firstName, lastName, email, phone });
  }

  @Mutation(() => Student)
  updateStudent(
    @Args('id', { type: () => Int }) id: number,
    @Args('firstName', { nullable: true }) firstName?: string,
    @Args('lastName', { nullable: true }) lastName?: string,
    @Args('email', { nullable: true }) email?: string,
    @Args('phone', { nullable: true }) phone?: string,
  ): Promise<Student> {
    return this.studentService.update(id, { firstName, lastName, email, phone });
  }

  @Mutation(() => Boolean)
  removeStudent(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.studentService.remove(id);
  }
}
