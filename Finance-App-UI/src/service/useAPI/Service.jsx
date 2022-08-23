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
      options.data = data;
    }

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

  async post(url, data) {
    const method = "POST";
    const res = await this.request(url, method, data);
    return res.data;
  }

  async delete(url, id) {
    const method = "DELETE";
    if (id) {
      url = `${url}/${id}`;
    }
    const res = await this.request(url, method);
    return res.data;
  }

  async put(url, id, data) {
    const method = "PUT";
    if (id) {
      url = `${url}/${id}`;
    }
    const res = await this.request(url, method, data);
    console.log(res);
  }
}
