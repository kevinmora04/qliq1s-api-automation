import { BaseService } from '../base/base.service';

class TestService extends BaseService {
  getEmpty(): Cypress.Chainable<any> {
    return cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}/Test/Empty`,
      headers: {
        accept: '*/*'
      }
    }).then(response => {
      if (response.status !== 200) {
        throw new Error(`Failed to get empty response: ${response.status}`);
      }
      return response.body;
    });
  }
}

export const testService = new TestService();