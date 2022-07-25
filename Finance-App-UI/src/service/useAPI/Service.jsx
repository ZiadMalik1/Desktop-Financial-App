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
    this.domain = "http://localhost:8080/api/v1/assets";
  }

  request(url, method = "POST", data = null) {
    url = joinURL(this.domain, url);
    const options = {
      headers,
      method,
    };
    if (data) {
      options.body = JSON.stringify({ ...data });
    }
    return axios(url, options);
  }

  get(url,id) {
    const method = "GET";
    if(id){
        url = `${url}/${id}`
    }
    return this.request(url, method).then((res) => res.data);
  }
}
