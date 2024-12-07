import { BaseService } from '../base/base.service';
import { FeedbackRequest, FeedbackResponse } from './feedback.service.types';

class SendFeedbackService extends BaseService {
  execute(feedbackRequest: FeedbackRequest): Cypress.Chainable<FeedbackResponse> {
    return cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/FeedBack/SendFeedback`,
      qs: { userId: feedbackRequest.userId },
      form: true, 
      body: {
        Subject: feedbackRequest.subject,
        Description: feedbackRequest.description,
        Version: feedbackRequest.version,
        Environment: feedbackRequest.environment,
        OS: feedbackRequest.os,
        Connection: feedbackRequest.connection,
        DeviceModel: feedbackRequest.deviceModel,
        FreeMemory: feedbackRequest.freeMemory,
        TotalMemory: feedbackRequest.totalMemory,
        Attachment: feedbackRequest.attachment
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      failOnStatusCode: false
    }).then(response => {
      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}: ${JSON.stringify(response.body)}`);
      }
      return response.body;
    });
  }
}

export const sendFeedbackService = new SendFeedbackService();