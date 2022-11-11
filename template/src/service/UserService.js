import { ApiService } from "@essenza/core";

export function UserService() {
  ApiService.call(this);

  this.getFiscalCode = (data) => {
    return this.ExecuteApi("cf", data);
  };

}