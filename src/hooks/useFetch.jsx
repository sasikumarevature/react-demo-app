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

    try {
      const response = await axiosInstance({
        url,
        headers: {
          ...options.headers,
          EncryptedToken: "7rL8RebbpebrWj1OwMowZwC2xR6f7J7J68tKw8DZbuzpt+Mgk7Bt0WBcKMVCIdsSvvTMVGa6QOw7bYS3pLIzhHXZTTKitrvM77SHpbPVAd1uF5ynpgb22ON8zgbSCikWh2aXCBdONv1Eh4tUHpNOnqNkfF24f+bPkk44grt1qjhQI6NaOiQt3JwpKbR3gDoP7oxW83nnGJjfGWFMirbRC+pIVpGYHE8ghxrCFmsseP0NHMuKvRhl7Vpn/rdHXueTDF3Tp9IEkGzzdrIv+7Ly2VN73spcxU51WdqQ8pSeCDgdqDneaPr6T4kpOKxCdiMDfNldPjP6GGmWVYT32DLTuLCgBQXr+8YREJJuc9+kNgrTe80asxSrgNwixDasak5vQ+mtFKoSGQsgfp2IhDs5mKCiOzKhJDBQKxGkydun6CwsxCfouRFocx+PXU5OVpU+enzoQOLBUnWSQ+TbUoAzUqGNL8r3thnrBpfx7JLzZ2eiw0GcPmuwMOTu8/qndya7u514w6i9US0jdAe4I7AaEDgF4+2HjX75pVSMHfidp/3VWlH+HZaQP4d12EWYJ761rZhOSnIg0QPVUXF4e47T5782Szz+ThOFOxouyGoesK/dVXLMVMhBsq/Ceuhw0vADDFjMqlSd5FzHorNfSV2oxRa/cGYCy7ZNvIK00MrY0sUZkxCdICElO0IdavAer+xuD3Kwdo8lvoOfVTnJHdrvvI6SILwEbtpKJdQLuztRgo9mm+3a6NC3/xeUerPA7+vh"
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
