import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';

@Injectable()
export default class UserLocalAuthGuard extends AuthGuard('UserLocal') {}
