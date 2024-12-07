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
    cy.log('🔧 Loading test configuration from fixture');
    cy.fixture('connections/connections').then((data) => {
      userId = data.userId;
      senderUserName = data.senderUserName;
      toUserId = data.toUserId;
      friendAction = data.friendAction;
      pageNumber = data.pageNumber || 1; 
      pageSize = data.pageSize || 10;   
      authToken = Cypress.env('authToken');
      if (!authToken) throw new Error('❌ Auth token is missing in Cypress environment');
      cy.log('✅ Test configuration and token loaded successfully');
    });
  });

  it('Should fetch friends successfully', () => {
    cy.log('🔄 Starting to fetch friends');
    cy.log(`📝 Fetching friends for user ID: ${userId} with pageNumber: ${pageNumber} and pageSize: ${pageSize}`);

    connectionsService.getFriends(userId, pageNumber, pageSize, authToken).then((response) => {
      cy.log(`📨 Get Friends Response: ${JSON.stringify(response, null, 2)}`);

      // Assert response status code
      expect(response.StatusCode, 'Expected StatusCode to be 200').to.eq(200);

      // Assert response message
      expect(response.Message).to.contain('friends found', 'Expected message to contain "friends found"');

      // Assert data structure
      expect(response.Data).to.be.an('array', 'Expected Data to be an array');

      // Assert array length
      expect(response.Data.length).to.be.greaterThan(0, 'Expected at least one friend in the list');

      // Validate first friend's structure
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

      cy.log('✅ Successfully validated friends data structure');
    });
  });

  it('Should perform connect action successfully', () => {
    cy.log('🔄 Starting connect action');
    cy.log(`📝 Sending connect request for UserId: ${userId}, ToUserId: ${toUserId}, Action: ${friendAction}`);
  
    connectionsService
      .connect({ userId, senderUserName, toUserId, friendAction }, authToken)
      .then((response) => {
        cy.log(`📨 Connect Response: ${JSON.stringify(response, null, 2)}`);
  
        expect(response.StatusCode).to.eq(200, 'Expected StatusCode to be 200');
    
        expect(response.Data).to.include({
          Status: 'Success',
        });
  
        cy.log('✅ Connect action performed successfully');
      });
  });
  
  
});
