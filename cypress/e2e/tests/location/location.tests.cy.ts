import { locationService } from '../../services/location/location.service.getLocation';

describe('Location API Tests', () => {
  it('GET /api/Location/Countries/Get - Should retrieve all countries ordered by country code', () => {
    cy.log('[INFO] Starting countries retrieval');
    
    locationService
      .getCountries()
      .then(response => {
        expect(response.StatusCode).to.eq(200);
        expect(response.Data).to.be.an('array');
        cy.log('[SUCCESS] Countries retrieved successfully');
      });
  });
});