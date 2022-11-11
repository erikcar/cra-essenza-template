import { DataModel } from "@essenza/core";

export function UserModel() {
    DataModel.call(this, "users");
  
    this.list = () => {
      return this.ExecuteQuery(`list: [users] (itype>-1) {*, -O itype#tsurname#temail 
      }`);
    }
    this.login = (user, password) => {
      return this.ExecuteApi("login: users {*}", { username: user, password: password }, { apiUrl: 'app/' });
    }
  
    this.profile = () => {
      return this.ExecuteApi("profile: users {*}");
    }

    this.getFiscalCode = () => {
      return this.ExecuteApi("cf: users {*}");
    }
  }