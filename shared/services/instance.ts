import axios from "axios"
import { IS_DEV_ENV } from "../utils/is-dev"

export const axiosInstance = axios.create({
	baseURL: IS_DEV_ENV ? process.env.NEXT_PUBLIC_SERVER_DEV_API : process.env.NEXT_PUBLIC_SERVER_API,
})
