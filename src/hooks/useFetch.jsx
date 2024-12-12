import axios from 'axios';
import { useState } from 'react';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const request = async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance({
        url,
        headers: {
          ...options.headers,
          EncryptedToken:
            '7rL8RebbpebrWj1OwMowZwC2xR6f7J7J68tKw8DZbuzpt+Mgk7Bt0WBcKMVCIdsSuH50hxpbJLHM28TpEpnSEnXZTTKitrvM77SHpbPVAd1uF5ynpgb22ON8zgbSCikWh2aXCBdONv1Eh4tUHpNOnqNkfF24f+bPkk44grt1qjhQI6NaOiQt3JwpKbR3gDoPs+g8TicLipK8479/2B6uczmlj1tMtWIkLGmOvWPlluImbwFGYVHa0XzgskvCXZ8b6khWkZgcTyCHGsIWayx4/Q0cy4q9GGXtWmf+t0de55Pvvh2Uaod5hk2IfrmcU7NTJwzoDOFN7I+0m6fQE9IzrVguEhMSQ5tb+vRiSWPNDI1IhFDF2yzBBVdSEkuULLCQNYJJGp+sbsRufdjFoIM4SzZFVEyGwxafsmBk8QXLKDpJm4I4D6toFLHSFsVvgO3j0kQ6kENO5jI0Ao18XN4RLwenv0dVM5YUQTHBYh7Y/taL/SizTd7HqNFisShQiHvId8XOx5Vgd2BEXAxyI6JPFQwrNk3PM/VyZkS/m9xeWaFztpe0L9vMbQjZHVjGOpY2ZM9ho9UuBCVZEiiO6xnRc782Szz+ThOFOxouyGoesK+y8LTzlu7P16+i8VuL6SM4EWS1+OBK3jlD24u1ZXYoXkJtaKb1DuWEzPfS8G1F+k5SbplIXqh2IRdWKCjlZRTbUMvM5mpHeSiCOTi5DeXyPQ+JbLPNpyRVhsYe+JJAgT+bqYUwChR8h1ly7YBIfEiE',
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
