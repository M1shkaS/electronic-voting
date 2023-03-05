import { makeAutoObservable } from "mobx";

class KeyStoreVoter {
  keys = {
    rsaKey: {},
    secrKey: {},
  };
  maskingFactor = null;
  registrarKeyPub = "";

  constructor() {
    makeAutoObservable(this);
  }

  postKeyVoter = (rsaKey, secrKey) => {
    this.keys = { rsaKey, secrKey };
  };
  postMaskingFactor = (number) => {
    this.maskingFactor = number;
  };
  postRegistrarKeyPub = (registrarKey) => {
    this.registrarKeyPub = registrarKey;
  };
}

const keyStoreVoter = new KeyStoreVoter();

export default keyStoreVoter;
