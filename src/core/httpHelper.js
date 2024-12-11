import axios from 'axios';

const BaseURL = "https://www.omdbapi.com/";

export const HttpGet = async(aParams) => {
  aParams['apikey'] = "3695b132";

  const oURL = BaseURL + "?" + new URLSearchParams(aParams);
  let oResponse = await axios.get(oURL);
  return oResponse?.data;
}