export interface FeedbackRequest {
  userId: string; 
  subject: string; 
  description: string; 
  version?: string; 
  environment?: string; 
  os?: string; 
  connection?: string; 
  deviceModel?: string; 
  freeMemory?: string; 
  totalMemory?: string; 
  attachment: File; 
}

export interface FeedbackResponse {
  StatusCode: number; 
  Message: string; 
  Data?: any; 
}
