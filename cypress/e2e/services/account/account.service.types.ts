export interface LoginParams {
    username: string;
    password: string;
    fcmToken: string;
    platform: string;
    deviceId: string;
    deviceModel: string;
    oSversion: string;
  }
  
  export interface ApiResponse<T = any> {
    StatusCode: number;
    Message: string;
    Data: T;
  }