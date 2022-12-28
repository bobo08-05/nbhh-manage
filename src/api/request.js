import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const instance = axios.create({
 timeout: 5000,
 baseURL: 'http://101.43.49.211:3000/api'
})

instance.interceptors.request.use(config => {
 nprogress.start();

 return config
})

instance.interceptors.response.use((res) => {
 nprogress.done();
 return res.data
}, (error) => {
 nprogress.done();
 return Promise.reject(error.response.data)
})

export default instance;