import { BaseService } from '../base/base.service';

class InfoService extends BaseService {
  getPolicy(): Cypress.Chainable<any> {
    return cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}/Info/policy/get`,
      headers: {
        accept: '*/*'
      }
    }).then(response => {
      if (response.status !== 200) {
        throw new Error(`Failed to get policy: ${response.status}`);
      }
      return response.body;
    });
  }
}

export const infoService = new InfoService();