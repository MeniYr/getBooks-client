import { isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import axios,{AxiosError} from "axios";
export const API_URL = "http://localhost:3000";
export const TOKEN_NAME = "token"
export const USER_PROP = "user_prop"

export const doApiGet = async (_url) => {
  try {
    let resp = await axios.get(_url, {
      headers: {
        "x-api-key": localStorage[TOKEN_NAME],
        'content-type': "application/json"
      }
    })
    return resp;
  }
  catch (err) {
    throw err;
  }
}

export const doApiMethod = async (_url, _method, _body) => {
  try {
    // console.log(_body)
    let resp = await axios({
      url: _url,
      method: _method,
      data: JSON.stringify(_body),
      headers: {
        "x-api-key": localStorage[TOKEN_NAME],
        'content-type': "application/json"
      }
    })
    // console.log(resp)
    return resp;
  }
  catch (err) {
    console.log(AxiosError.ERR_BAD_REQUEST)
    console.log(err)
   return isRejectedWithValue(err);
     
  }
}