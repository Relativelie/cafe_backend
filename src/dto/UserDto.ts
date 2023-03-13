import { User } from "@controller/user";

export class UserDto {
  email: string;
  id: string;
  isActivated: boolean;

  constructor(model: User) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.is_activated;
  }
}
