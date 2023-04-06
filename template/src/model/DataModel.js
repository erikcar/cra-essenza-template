import { DataModel as Model } from "@essenza/core";

export function DataModel() {
    Model.call(this, "data");
  
    this.values = () => {
      this.ExecuteQuery("values: [data] {*}", null, true);
    };
}