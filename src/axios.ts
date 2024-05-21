import axios, {
    AxiosError,
    type AxiosInstance,
    type InternalAxiosRequestConfig,
    type AxiosRequestConfig,
    type AxiosResponse,
} from "axios";
import qs from 'qs'

import { CodeConfig } from '@/codeConfig'
import type { ResponseModel } from "./types";

class HttpRequest {
    service: AxiosInstance


    constructor() {
        this.service = axios.create({
            baseURL: "",
            timeout: 5 * 1000,
            paramsSerializer: (param) => {
                return qs.stringify(param, {arrayFormat: 'brackets'})
              }
        });

        this.service.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                return config
            },
            (error: AxiosError) => {
                console.log('requestError: ', error)
                return Promise.reject(error)
            },
            {
                synchronous: false,
                runWhen: ((config: InternalAxiosRequestConfig) => {
                    // do something

                    // if return ture, axios will execution interceptor method
                    return true
                })
            }
        );

        this.service.interceptors.response.use(
            (response: AxiosResponse<ResponseModel>): AxiosResponse['data'] => {
                const { data } = response
                const { code } = data
                if (code) {
                    if (code != CodeConfig.success) {
                        switch (code) {
                            case CodeConfig.notFound:
                                // handler...
                                break;
                            case CodeConfig.noPermission:
                                // handler...
                                break;
                            default:
                                break;
                        }
                        return Promise.reject(data.message)
                    } else {
                        return data
                    }
                } else {
                    return Promise.reject('Error! code misssing!')
                }
            },
            (error: any) => {
                return Promise.reject(error)
            }
        );
    }

    request<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
        /**
         * TODO: execute other methods according to config
         */

        return new Promise((resolve, reject) => {
            try {
                this.service.request<ResponseModel<T>>(config)
                    .then((res: AxiosResponse['data']) => {
                        resolve(res as ResponseModel<T>);
                    })
                    .catch((err) => {
                        reject(err)
                    })
            } catch (err) {
                return Promise.reject(err)
            }
        })
    }

    get<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
        return this.request({method: 'GET', ...config})
    }

    post<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
        return this.request({method: 'POST', ...config})
    }

    put<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
        return this.request({ method: 'PUT', ...config })
    }

    delete<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
        return this.request({ method: 'DELETE', ...config })
    }
}

const httpRequest = new HttpRequest()
export default httpRequest;