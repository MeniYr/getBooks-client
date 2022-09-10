import { isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
export const API_URL = "https://getbooks.onrender.com";
export const TOKEN_NAME = "token"
export const USER_PROP = "user_prop"

export const doApiGet = async (_url) => {

  let resp = await axios.get(_url, {
    headers: {
      "x-api-key": localStorage[TOKEN_NAME],
      'content-type': "application/json"
    }
  })
  return resp;

}

export const doApiMethod = async (_url, _method, _body) => {

  let resp = await axios({
    url: _url,
    method: _method,
    data: JSON.stringify(_body) || _body,
    headers: {
      "x-api-key": localStorage[TOKEN_NAME],
      'content-type': "application/json"
    }
  })
  return resp;
}
