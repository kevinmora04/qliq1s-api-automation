import { infoService } from '../../services/info/info.service.getPolicy';

describe('Info API Tests', () => {
  it('GET /api/Info/policy/get - Should retrieve policy information', () => {
    cy.log('[INFO] Starting policy retrieval');
    
    infoService
      .getPolicy()
      .then(response => {
        expect(response.StatusCode).to.eq(200);
        cy.log('[SUCCESS] Policy retrieved successfully');
      });
  });
});