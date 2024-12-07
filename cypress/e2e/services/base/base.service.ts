import { Logger } from '../../../support/logger';

export class BaseService {
  /**
   * Send an HTTP request and handle errors
   * @param method - HTTP method (GET, POST, PUT, DELETE)
   * @param url - API endpoint URL
   * @param options - Additional options such as query params, body, and headers
   * @returns - Cypress.Chainable containing the response body
   */
  protected request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options: Partial<Cypress.RequestOptions> = {}
  ): Cypress.Chainable<T> {
    // Log the request at DEBUG level
    Logger.debug(`Sending API request: ${method} ${url}`, {
      method,
      url,
      options: this.redactSensitiveInfo(options),
    });

    return cy
      .request({
        method,
        url: `${Cypress.config('baseUrl')}${url}`,
        ...options,
        failOnStatusCode: false,
      })
      .then((response) => {
        // Log the response at DEBUG level
        Logger.debug(`Received API response from ${method} ${url}`, {
          status: response.status,
          statusText: response.statusText,
          body: response.body,
        });

        if (response.status < 200 || response.status >= 300) {
          this.handleError(response, method, url, options);
        } else {
          // Log success at INFO level
          Logger.info(`API request successful: ${method} ${url}`, {
            status: response.status,
          });
        }

        return response.body;
      });
  }

  /**
   * Handle errors for unsuccessful HTTP responses
   * @param response - Cypress response object
   * @param method - HTTP method used
   * @param url - URL endpoint of the request
   * @param options - Options used for the request
   */
  private handleError(
    response: Cypress.Response<any>,
    method: string,
    url: string,
    options: Partial<Cypress.RequestOptions>
  ) {
    const { status, body, requestHeaders } = response;

    // Log the error at ERROR level
    Logger.error(`API request failed: ${method} ${url}`, {
      status,
      responseBody: body,
      requestHeaders: this.redactSensitiveInfo(requestHeaders),
      requestOptions: this.redactSensitiveInfo(options),
    });

    let errorMessage = `API Request Failed:
    - Method: ${method}
    - URL: ${Cypress.config('baseUrl')}${url}
    - Status: ${status}
    - Response Body: ${JSON.stringify(body, null, 2)}`;

    // Add custom messages for specific status codes if needed
    switch (status) {
      case 400:
        errorMessage += `\nError 400: Bad Request - Check your request parameters or body.`;
        break;
      case 401:
        errorMessage += `\nError 401: Unauthorized - Check your authentication.`;
        break;
      case 404:
        errorMessage += `\nError 404: Not Found - The endpoint or resource was not found.`;
        break;
      case 500:
        errorMessage += `\nError 500: Internal Server Error - Server-side issue occurred.`;
        break;
      default:
        errorMessage += `\nUnexpected Error: Status code ${status}.`;
    }

    throw new Error(errorMessage);
  }

  /**
   * Redact sensitive information from logs
   * @param data - Data object that may contain sensitive info
   * @returns - Data object with sensitive info redacted
   */
  private redactSensitiveInfo(data: any): any {
    if (!data || typeof data !== 'object') {
      return data;
    }

    const redactedData = { ...data };

    if (redactedData.headers) {
      const headers = { ...redactedData.headers };
      if (headers.Authorization) {
        headers.Authorization = '[REDACTED]';
      }
      redactedData.headers = headers;
    }

    if (redactedData.auth) {
      redactedData.auth = '[REDACTED]';
    }

    if (redactedData.password) {
      redactedData.password = '[REDACTED]';
    }

    if (redactedData.body && typeof redactedData.body === 'object') {
      redactedData.body = this.redactSensitiveInfo(redactedData.body);
    }

    return redactedData;
  }
}
