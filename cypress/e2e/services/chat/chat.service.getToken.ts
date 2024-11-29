import { BaseService } from '../base/base.service';
import { ApiResponse } from './chat.service.types';

class GetTokenService extends BaseService {
  execute(userAzureId: string): Cypress.Chainable<ApiResponse> {
    return this.request<ApiResponse>('GET', '/Chat/GetToken', {
      qs: { userAzureId },
      headers: { accept: '*/*' }
    });
  }
}

export const getTokenService = new GetTokenService();