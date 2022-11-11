import { DataModel } from "@essenza/core";

export function SkillModel() {
    DataModel.call(this, "skill");
  
    this.list = () => {
      this.ExecuteQuery("list: [skill] {*}", null, true);
    };
  }