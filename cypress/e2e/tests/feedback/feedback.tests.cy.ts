// feedback.tests.cy.ts
import { FeedbackRequest } from '../../services/feedback/feedback.service.types';

describe('Feedback API Tests', () => {
  let feedbackRequest: FeedbackRequest;

  before(() => {
    cy.log('[INFO] Loading test configuration');
    
    cy.fixture('images/test-image.jpg', 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then(blob => {
        const file = new File([blob], 'test-image.jpg', { type: 'image/jpeg' });
        
        cy.fixture('feedback/feedback').then((data) => {
          feedbackRequest = {
            userId: data.userId,
            subject: data.subject,
            description: data.description,
            version: data.version,
            environment: data.environment,
            os: data.os,
            connection: data.connection,
            deviceModel: data.deviceModel,
            freeMemory: data.freeMemory,
            totalMemory: data.totalMemory,
            attachment: file
          };
        });
      });
  });

  it('POST /api/FeedBack/SendFeedback - Should submit feedback successfully', () => {
    cy.log('[INFO] Starting feedback submission');
    
    const formData = new FormData();
    formData.append('Subject', feedbackRequest.subject);
    formData.append('Description', feedbackRequest.description);
    formData.append('Version', feedbackRequest.version);
    formData.append('Environment', feedbackRequest.environment);
    formData.append('OS', feedbackRequest.os);
    formData.append('Connection', feedbackRequest.connection);
    formData.append('DeviceModel', feedbackRequest.deviceModel);
    formData.append('FreeMemory', feedbackRequest.freeMemory);
    formData.append('TotalMemory', feedbackRequest.totalMemory);
    formData.append('Attachment', feedbackRequest.attachment);

    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/FeedBack/SendFeedback`,
      qs: { userId: feedbackRequest.userId },
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      cy.log('[SUCCESS] Feedback submitted successfully');
    });
  });
});