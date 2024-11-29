# JSON Field Descriptions

This table provides a detailed explanation of each field in the JSON structure used for the Chat API tests.

| **Field Name**         | **Description**                                                                            | **Example Value**                                                                                          |
|------------------------|--------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `userAzureId`          | Unique identifier for the user initiating or participating in the chat.                    | `8:acs:902cdda2-2532-46e6-a252-902047737edf_00000022-787e-5047-6763-563a0d00f296`                         |
| `chatId`               | Identifier for the chat thread, used for actions like sending messages or retrieving chats.| `19:acsV1_G71iZUmEK9fFxtwzWqXjDF_jBGRB2Z6me03IN_GQ3pY1@thread.v2`                                         |
| `initiator.azureId`    | Azure ID of the user who initiated the chat (same as `userAzureId`).                        | `8:acs:902cdda2-2532-46e6-a252-902047737edf_00000022-787e-5047-6763-563a0d00f296`                         |
| `initiator.name`       | Name of the user who initiated the chat.                                                   | `kevinmora47`                                                                                            |
| `participants[].id`    | Unique identifier for a participant in the chat.                                           | `8:acs:902cdda2-2532-46e6-a252-902047737edf_00000023-12a9-d924-df68-563a0d00924c`                         |
| `participants[].name`  | Name of a participant in the chat.                                                         | `Israel`                                                                                                 |
| `topic`                | Title or topic of the chat thread.                                                         | `Automated Endpoint Topic`                                                                                |
| `profilePicture`       | URL or base64 string for the chat's profile picture. An empty string indicates no picture. | `""`                                                                                                      |
| `chatType`             | Type of chat: `0` for individual, `1` for group.                                           | `0`                                                                                                       |

## Notes

- **`userAzureId`** and **`initiator.azureId`**: These fields often represent the same user when the chat is initiated by the same person.
- **`participants`**: The list of participants can include one or more entries. For group chats (`chatType: 1`), this array will have multiple participants.
- **`profilePicture`**: If left empty, no profile picture will be displayed for the chat thread.

This documentation ensures a clear understanding of the JSON structure and its purpose in the Chat API tests.
