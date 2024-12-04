export interface FeedbackRequest {
  userId: string; // ID of the user submitting the feedback
  subject: string; // The subject/title of the feedback
  description: string; // Detailed description of the feedback or issue
  version?: string; // (Optional) Application version
  environment?: string; // (Optional) Environment, e.g., Android, iOS, etc.
  os?: string; // (Optional) Operating System details
  connection?: string; // (Optional) Network connection details
  deviceModel?: string; // (Optional) Device model name
  freeMemory?: string; // (Optional) Free memory available
  totalMemory?: string; // (Optional) Total memory of the device
  attachment: File; // Screenshot or picture attachment
}

export interface FeedbackResponse {
  StatusCode: number; // HTTP Status Code returned from the API (e.g., 200 for success)
  Message: string; // Message indicating the success or failure of the request
  Data?: any; // Additional data, if the API includes extended responses
}
