import { makeAutoObservable } from "mobx";

class TableDataStore {
  tablData = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTableData = (infoTable) => {
    this.tablData = [...infoTable];
  };
}

const tableDataStore = new TableDataStore();

export default tableDataStore;
