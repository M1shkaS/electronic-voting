import axios from "./helpers/axios";

export default {
  async postPerson(pass) {
    const response = await axios.post(`/voters`, {
      pass,
    });

    const dataResponse = await response.data.status;
    return dataResponse;
  },
};
