import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

// Base API class to handle common functionality
class Api {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle auth errors
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // Add the `get` method
  public get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.api.get(url, config).then((response) => response.data)
  }

  public request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.api.request(config).then((response) => response.data)
  }
}

export default new Api()
