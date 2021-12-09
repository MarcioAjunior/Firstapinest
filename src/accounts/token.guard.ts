import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccountStorageService } from './account-storege/account-storege.service';

@Injectable()
export class TokenGuard implements CanActivate {

  constructor(private accountStorege : AccountStorageService){}

  async canActivate( context: ExecutionContext ): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest()
    const token = request.headers?.['x-token'] as string
    if (token){
      try{
        await this.accountStorege.setBy(token)
        return true;
      }catch(e){
        console.error(e);
        return false
      }
    }
    return false
  }
}
