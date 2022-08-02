import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-type": "application/json",
};

function joinURL(baseURL, url) {
  return `${baseURL}/${url}`;
}

export default class Service {
  constructor() {
    this.domain = "http://localhost:8080/api/v1";
  }

  request(url, method = "POST", data = null) {
    url = joinURL(this.domain, url);
    const options = {
      headers,
      method,
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    console.log(url)
    console.log(options)
    return axios(url, options);
  }

  async get(url, id) {
    const method = "GET";
    if (id) {
      url = `${url}/${id}`;
    }
    const res = await this.request(url, method);
    return res.data;
  }

  async post(url, data){
    const method = "POST";
    console.log("HELLO " + url)
    const res = await this.request(url, method, data);
    return res.data;
  }

}
