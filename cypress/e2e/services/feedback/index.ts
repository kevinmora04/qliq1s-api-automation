import { sendFeedbackService } from './feedback.service.sendFeedback';

export const feedbackService = {
  sendFeedback: sendFeedbackService.execute.bind(sendFeedbackService),
};

export * from './feedback.service.types';
