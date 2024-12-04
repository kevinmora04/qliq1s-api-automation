import { BaseService } from '../base/base.service';
import { GetFriendsResponse } from './connections.service.types';

class GetFriendsService extends BaseService {
  execute(userId: string, pageNumber: number, pageSize: number): Cypress.Chainable<GetFriendsResponse> {
    const token = Cypress.env('authToken'); // Retrieve the token from cypress.env.json

    return cy.request({
      method: 'GET',
      url: `${Cypress.env('baseUrl')}/Connections/friends/get`,
      qs: {
        userId: userId,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the token here
      },
    }).then(this.handleResponse('Failed to fetch friends'));
  }

  private handleResponse(errorMessage: string) {
    return (response: any) => {
      if (response.status !== 200) {
        throw new Error(`${errorMessage}: ${response.status}`);
      }
      return response.body;
    };
  }
}

export const getFriendsService = new GetFriendsService();
