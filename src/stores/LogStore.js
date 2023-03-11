import { makeAutoObservable } from "mobx";

class LogStore {
  userLog = [];
  appLog = [];

  constructor() {
    makeAutoObservable(this);
  }

  addUserTextLog = (text) => {
    this.userLog.push(text);
  };

  addAppTextLog = (text) => {
    this.appLog.push(text);
  };
}

const logStore = new LogStore();

export default logStore;
