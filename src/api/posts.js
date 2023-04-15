// import axios from "./helpers/axios.js";
import axios from "axios";

export default {
  async postPerson(pass) {
    const response = await axios.post(`http://localhost:3001/voters`, {
      pass,
    });

    const dataResponse = await response.data.status;
    return dataResponse;
  },
  async postKey(id, keyPub) {
    const response = await axios.post(`http://localhost:3001/postkeyvoters`, {
      id,
      keyPub,
    });

    const dataResponse = await response.data.registrarKeyPub;
    return dataResponse;
  },
  async postEncryptMaskText(id, signEncrypt, blindEncrypt) {
    const response = await axios.post(`http://localhost:3001/postencrvoting`, {
      id,
      signEncrypt,
      blindEncrypt,
    });

    const dataResponse = await response.data;
    return dataResponse;
  },
  async test(unblinded, encryptVoting) {
    const response = await axios.post(`http://localhost:3001/test`, {
      unblinded,
      encryptVoting,
    });

    const dataResponse = await response.data;
    return dataResponse;
  },
  async getDataTable() {
    const response = await axios.get(`http://localhost:3002/getdatatable`);

    const dataResponse = await response.data;
    return dataResponse;
  },

  async postEncryptCounter(uniqueLabelCorrection, encryptVoting, unblinded) {
    const response = await axios.post(`http://localhost:3002/postencr`, {
      uniqueLabelCorrection,
      encryptVoting,
      unblinded,
    });

    const dataResponse = await response.data;
    return dataResponse;
  },
  async postVotingKey(uniqueLabelCorrection, secretVotingKey) {
    const response = await axios.post(`http://localhost:3002/postvotingkey`, {
      uniqueLabelCorrection,
      secretVotingKey,
    });

    const dataResponse = await response.data;
    return dataResponse;
  },
  async getRemainingTime() {
    const response = await axios.get(`http://localhost:3002/gettime`);

    const dataResponse = await response.data;
    return dataResponse;
  },
};
