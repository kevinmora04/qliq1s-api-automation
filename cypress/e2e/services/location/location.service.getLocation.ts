import { BaseService } from '../base/base.service';

class LocationService extends BaseService {
  getCountries(): Cypress.Chainable<any> {
    return cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}/Location/Countries/Get`,
      headers: {
        accept: '*/*'
      }
    }).then(response => {
      if (response.status !== 200) {
        throw new Error(`Failed to get countries: ${response.status}`);
      }
      return response.body;
    });
  }
}

export const locationService = new LocationService();