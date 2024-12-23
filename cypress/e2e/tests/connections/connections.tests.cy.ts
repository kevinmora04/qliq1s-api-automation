import { connectionsService } from '../../services/connections';

describe('Connections API Tests', () => {
  let userId: string;
  let pageNumber: number;
  let pageSize: number;
  let authToken: string;
  let senderUserName: string;
  let toUserId: string;
  let friendAction: number;

  before(() => {
    cy.log('[INFO] Loading test configuration from fixture');
    cy.fixture('connections/connections').then((data) => {
      userId = data.userId;
      senderUserName = data.senderUserName;
      toUserId = data.toUserId;
      friendAction = data.friendAction;
      pageNumber = data.pageNumber || 1; 
      pageSize = data.pageSize || 10;  
      authToken = data.authToken || "No valid token";
      
      if (!authToken) {
        throw new Error('[ERROR] Auth token is missing in environment variables and Cypress environment');
      }
      
      cy.log('[INFO] Test configuration and token loaded successfully');
      cy.log('[INFO] Test configuration and token loaded successfully');
    });
  });

  it('Should fetch friends successfully', () => {
    cy.log('[INFO] Starting to fetch friends');
    cy.log(`[INFO] Fetching friends for user ID: ${userId} with pageNumber: ${pageNumber} and pageSize: ${pageSize}`);

    connectionsService.getFriends(userId, pageNumber, pageSize, authToken).then((response) => {
      cy.log(`[INFO] Get Friends Response: ${JSON.stringify(response, null, 2)}`);

      expect(response.StatusCode, 'Expected StatusCode to be 200').to.eq(200);
      expect(response.Message).to.contain('friends found', 'Expected message to contain "friends found"');
      expect(response.Data).to.be.an('array', 'Expected Data to be an array');
      expect(response.Data.length).to.be.greaterThan(0, 'Expected at least one friend in the list');

      const firstFriend = response.Data[0];
      expect(firstFriend, 'First friend data validation failed').to.include.keys(
        'UserId',
        'QliQId',
        'FirstName',
        'LastName',
        'ProfilePicture',
        'Email',
        'FriendsCount'
      );

      cy.log('[SUCCESS] Successfully validated friends data structure');
    });
  });

  it('Should perform connect action successfully', () => {
    cy.log('[INFO] Starting connect action');
    cy.log(`[INFO] Sending connect request for UserId: ${userId}, ToUserId: ${toUserId}, Action: ${friendAction}`);
  
    connectionsService
      .connect({ userId, senderUserName, toUserId, friendAction }, authToken)
      .then((response) => {
        cy.log(`[INFO] Connect Response: ${JSON.stringify(response, null, 2)}`);
  
        expect(response.StatusCode).to.eq(200, 'Expected StatusCode to be 200');
        expect(response.Data).to.include({
          Status: 'Success',
        });
  
        cy.log('[SUCCESS] Connect action performed successfully');
      });
  });
});