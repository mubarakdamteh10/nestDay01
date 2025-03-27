import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class ApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apikey = request.header('X-API-KEY');

        if (apikey !== 'my-mom-proud-of-me') {
            return false;
        }
        return true;
    }
}