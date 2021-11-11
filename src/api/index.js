import axios from 'axios';
import router from '../router';

const userService = axios.create({
    baseURL: window.env.api.baseUrl,
    timeout: 30000,
});

const requestHandler = request => {
    // console.log(request);
    return request;
};
const responseHandler = (response) => {
    const { ret } = response.data
    if (ret == 999)
        return router.replace({ name: 'error' })
    return response.data
}

userService.interceptors.request.use(
    request => requestHandler(request),
    error => Promise.reject(error)
);

userService.interceptors.response.use(
    response => responseHandler(response),
    error => errorHandler(error)
);

export const userApi = userService;