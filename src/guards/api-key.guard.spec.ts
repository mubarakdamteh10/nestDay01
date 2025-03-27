import { ApiKeyGuard } from './api-key.guard';
import { ExecutionContext } from '@nestjs/common';

describe('ApiKeyGuard', () => {
    let apiKeyGuard: ApiKeyGuard;

    beforeEach(() => {
        apiKeyGuard = new ApiKeyGuard();
    });

    it('should return true if the API key is valid', () => {
        const mockContext = {
            switchToHttp: () => ({
                getRequest: () => ({
                    header: (key: string) => 'my-mom-proud-of-me',
                }),
            }),
        } as unknown as ExecutionContext;

        const result = apiKeyGuard.canActivate(mockContext);
        expect(result).toBe(true);
    });

    it('should return false if the API key is invalid', () => {
        const mockContext = {
            switchToHttp: () => ({
                getRequest: () => ({
                    header: (key: string) => 'invalid-key',
                }),
            }),
        } as unknown as ExecutionContext;

        const result = apiKeyGuard.canActivate(mockContext);
        expect(result).toBe(false);
    });

    it('should return false if the API key is missing', () => {
        const mockContext = {
            switchToHttp: () => ({
                getRequest: () => ({
                    header: (key: string) => undefined,
                }),
            }),
        } as unknown as ExecutionContext;

        const result = apiKeyGuard.canActivate(mockContext);
        expect(result).toBe(false);
    });
});

