import { useState } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const request = async (url, options = {}) => {
    setLoading(true);
    setError(null);
    const token = "7rL8RebbpebrWj1OwMowZwC2xR6f7J7J68tKw8DZbuzpt+Mgk7Bt0WBcKMVCIdsSOmgf4A30iqnkOFDF0KJkg3XZTTKitrvM77SHpbPVAd1uF5ynpgb22ON8zgbSCikWh2aXCBdONv1Eh4tUHpNOnqNkfF24f+bPkk44grt1qjhQI6NaOiQt3JwpKbR3gDoPs+g8TicLipK8479/2B6uczmlj1tMtWIkLGmOvWPlluImbwFGYVHa0XzgskvCXZ8b6khWkZgcTyCHGsIWayx4/Q0cy4q9GGXtWmf+t0de55OVtkF1klbDYhLl3tDNybmHnkHyuwxMmQngbHMHPhWTFLfkG/EArJ1sYLgfmixtAapz3u2AYtD0c6WejE+bXNpJJ8olUUGxh580zNjBV4f4R8dHptRaRODtoW4VfPwHKjDynOkc0PbQjheUtTADg9ynPQCO9WQNxQmaWWG3HIHqdAqS9QQzV90G0n2/Vth/7wCgvrYixhqVCGMf5ualBrknngwbIJbCh/P5g62kdqCVfNJEOpBDTuYyNAKNfFzeES+tzFPJ8MqYncVyXJ4Zn/trTFOZ6xQAnY0R5Cl67k/eNuSbNyVYS/hOpUoo2lzNzjWsoqnTtgoyHyZ4EBNfTP6O+fDhOICvGgvA4bF3U8yASxzM61tYQN3fyCzLwLwmfMRvcV53lYCDtAOXWVTqFYhMRFdAsMOQiWSSuEpbpB65cbDbDHd4JPM2Fi9jHY7A1Og="
    try {
      const response = await axiosInstance({
        url,
        headers: {
          ...options.headers,
          EncryptedToken: token
        },
        ...options,
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      console.error('Axios request error', err);
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const get = async (url, params = {}) => {
    return request(url, { method: 'GET', params });
  };

  const post = async (url, body = {}) => {
    return request(url, {
      method: 'POST',
      data: body,
    });
  };

  const put = async (url, body = {}) => {
    return request(url, {
      method: 'PUT',
      data: body,
    });
  };

  const deleteRequest = async (url) => {
    return request(url, {
      method: 'DELETE',
    });
  };

  return { data, loading, error, get, post, put, deleteRequest };
};

export default useFetch;
