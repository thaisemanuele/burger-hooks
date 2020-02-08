import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);
        
    const reqInterceptor = httpClient.interceptors.response.use(req => {
        setError(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });

    const { request, response } = httpClient.interceptors;

    useEffect(() => {
        return () => {
            request.eject(reqInterceptor);
            response.eject(resInterceptor);
        };
    }, [request, response, reqInterceptor, resInterceptor]);

    const errorConfirmeHandler = () => {
        setError(null);
    }

    return [error, errorConfirmeHandler];
};