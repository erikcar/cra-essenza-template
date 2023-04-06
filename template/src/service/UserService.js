import { ApiService } from "@essenza/core";

export function AppService() {
  ApiService.call(this);

  this.test = (message) => {
    return this.ExecuteApi("test_api", {value: message});
  };

}