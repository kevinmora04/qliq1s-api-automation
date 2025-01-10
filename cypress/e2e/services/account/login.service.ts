// cypress/e2e/services/account/login.service.ts

import { BaseService } from '../base/base.service';
import { Logger } from '../../../support/logger';
import { LoginParams, ApiResponse } from './account.service.types';

class LoginService extends BaseService {
  /**
   * Sends a POST request to /api/Account/Login
   * @param params - The login payload (username, password, etc.)
   */
  execute(params: LoginParams): Cypress.Chainable<ApiResponse> {
    Logger.info('Starting Login operation');
    Logger.debug('Login request parameters', params);

    return this.request<ApiResponse>('POST', '/Account/Login', {
      headers: { 'Content-Type': 'application/json' },
      body: params,
    }).then((response) => {
      Logger.debug('Login response received', { response });

      if (response.StatusCode === 200) {
        Logger.info('Login operation completed successfully', {
          statusCode: response.StatusCode,
          message: response.Message,
        });
      } else {
        Logger.error('Login operation failed', {
          statusCode: response.StatusCode,
          message: response.Message,
        });
      }

      return response;
    });
  }
}

export const loginService = new LoginService();