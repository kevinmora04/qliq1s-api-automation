export interface Friend {
    UserId: string;
    QliQId: string;
    FirstName: string;
    LastName: string;
    UserName: string;
    ProfilePicture: string;
    CoverPicture: string;
    IsActive: boolean;
    Email: string;
    AzureChatIdentity: string;
    Location: string | null;
    DateOfBirth: string | null;
    Gender: number;
    MobileNo: string;
    Hobbies: string | null;
    Experience: string | null;
    Education: string | null;
    Latitude: number | null;
    Longitude: number | null;
    SelfQuotes: string | null;
    CountryId: number;
    FriendPrivacy: number;
    ContactPrivacy: number;
    AboutPrivacy: number;
    PostPrivacy: number;
    GroupPrivacy: number;
    ReelsPrivacy: number;
    BuyPrivacy: number;
    OnlinePrivacy: number;
    FriendsCount: number;
    FollowersCount: number;
    FollowingCount: number;
    PostsCount: number;
  }
  
  export interface GetFriendsResponse {
    StatusCode: number;
    Message: string;
    Data: Friend[];
  }
  
  export interface ConnectRequest {
    userId: string; // The ID of the user making the request
    senderUserName: string; // The username of the sender
    toUserId: string; // The ID of the user to connect with
    friendAction: number; // The action to perform (e.g., Add, UnFriend, Block, etc.)
  }
  
  export interface ConnectResponse {
    StatusCode: number; // HTTP Status Code returned from the API
    Message: string; // Message indicating the success or failure of the request
    Data?: any; // Additional data (optional)
  }