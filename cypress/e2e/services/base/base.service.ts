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
      return cy.api({
        method,
        url: `${url}`,
        ...options,
        failOnStatusCode: false,
      }).then((response) => {
        Cypress.log({
          name: `${method} ${url}`,
          message: `Status: ${response.status}, Response: ${response.body}`,
        });
  
        if (response.status < 200 || response.status >= 300) {
          this.handleError(response, method, url, options);
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
    private handleError(response: Cypress.Response<any>, method: string, url: string, options: Partial<Cypress.RequestOptions>) {
      const { status, body, requestHeaders } = response;
  
      let errorMessage = `API Request Failed:
      - Method: ${method}
      - URL: ${Cypress.config('baseUrl')}${url}
      - Status: ${status}
      - Response Body: ${JSON.stringify(body, null, 2)}
      - Request Headers: ${JSON.stringify(requestHeaders, null, 2)}
      - Request Options: ${JSON.stringify(options, null, 2)}`;
  
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
  
      Cypress.log({ name: 'API Error', message: errorMessage });
      throw new Error(errorMessage);
    }
  }