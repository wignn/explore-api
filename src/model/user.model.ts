import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserRequest {
  @ApiProperty({
    example:"wign",
    required: false
  })
  name?: string;
  
  @ApiProperty({
    example:"wign",
    required:true
  })

  username: string;
  @ApiProperty({
    example:"wign",
    required: true
  })

  email: string;
  @ApiProperty({
    example:"password",
    required: true
  })
  password: string;
}


export class UserResponse {
  id: string;
  name?: string;
  username: string;
  token?: string;
  isAdmin?:boolean;
  backendTokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

export class LoginUserRequest {
  @ApiProperty({
    example:"wign",
    required:true
  })

  username: string;
  @ApiProperty({
    example:"password",
    required: true
  })
  password: string;

}

export class ResetRequest {
  email: string;
  password: string;
  valToken: string
}

export class UpdateUserRequest {
  bio?: string;
  name?: string;
  profilePic?: string;
}

export class UserGetResponse {
  id: string;
  name?: string;
  username: string;
  profilePic?: string;
  email: string;
  createdAt: string;
  token?: string;
  isAdmin?:boolean;
  lastLogin : string;
  bookmarks: { id: string,bookId: string }[]
}


export class UpdateUserRespone {
  id: string;
  bio?: string;
  name?: string;
  profilePic?: string;
}

export class logoutRequest {
  username: string;
  token: string;
}



