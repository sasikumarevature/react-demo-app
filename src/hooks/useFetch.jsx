import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { clearToken } from '../redux/slices/authSlice'; // Assuming the authSlice contains the clearToken action
import { useNavigate } from 'react-router-dom';
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const request = async (url, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance({
        url,
        headers: {
          ...options.headers,
          EncryptedToken: decodeURIComponent(token),
        },
        ...options,
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      console.error('Axios request error', err);
      if (err.status === 401) {
        dispatch(clearToken());
        alert("Session expired. Please login again.");
        navigate("/");
      }

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
