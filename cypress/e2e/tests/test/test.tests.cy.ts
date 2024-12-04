import { testService } from '../../services/test/test.service.getTest';

describe('Test API Tests', () => {
  it('GET /api/Test/Empty - Should retrieve empty response successfully', () => {
    cy.log('[INFO] Starting empty test request');
    
    testService
      .getEmpty()
      .then(response => {
        expect(response.StatusCode).to.eq(200);
        cy.log('[SUCCESS] Empty response retrieved successfully');
      });
  });
});