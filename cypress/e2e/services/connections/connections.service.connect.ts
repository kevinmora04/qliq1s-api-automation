import { BaseService } from '../base/base.service';
import { ConnectRequest, ConnectResponse } from './connections.service.types';

class ConnectService extends BaseService {
  execute(
    connectRequest: ConnectRequest,
    authToken: string
  ): Cypress.Chainable<ConnectResponse> {
    const data = {
      UserId: connectRequest.userId,
      SenderUserName: connectRequest.senderUserName,
      ToUserId: connectRequest.toUserId,
      FriendAction: connectRequest.friendAction.toString(),
    };

    return cy
      .request({
        method: 'POST',
        url: `${Cypress.env('baseUrl')}/Connections/friends/connect`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        form: true, // Send data as application/x-www-form-urlencoded
        body: data,
        failOnStatusCode: false,
      })
      .then((response) => {
        Cypress.log({
          name: 'API Raw Response',
          message: JSON.stringify(response, null, 2),
        });

        // Return the response body as the actual response
        return response.body as ConnectResponse;
      });
  }
}

export const connectService = new ConnectService();
