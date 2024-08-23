import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class EmployeeLocalAuthGuard extends AuthGuard('EmployeeLocal') {}
