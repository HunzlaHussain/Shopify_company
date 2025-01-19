import { getServerAuthSession } from "@/lib/auth"
import { AddUserInput } from "@/validators/add-user"
import axios from "axios"

export const getAllUsers = async () => {
    try {
        const session = await getServerAuthSession()
        const { token, business_id } = session?.user!
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customers`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
                business_id: business_id,
                per_page: -1,
            },
        })

        return data.data
    } catch (error) {
        throw error
    }
}

export const getSpecificUser = async (id: number) => {
    try {
        const session = await getServerAuthSession()
        const { token, business_id } = session?.user!
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
                business_id: business_id,
            },
        })

        return data.data
    } catch (error) {
        throw error
    }
}

export const deleteUser = async (id: number, token: string) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/delete/${id}`, null, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        return data.data
    } catch (error) {
        throw error
    }
}

export const createUser = async (userData: AddUserInput, token: string) => {
    const { phoneNumber, ...rest } = userData
    const payload = {
        mobile_no: phoneNumber,
        ...rest,
    }
    try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/register`, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })


        if (status === 201) {
            return data.data
        } else {
            throw new Error("Something Went Wrong")
        }
    } catch (error) {
        throw error;
    }
}

export const editUser = async (userData: AddUserInput, id: number, token: string) => {
    const { phoneNumber, ...rest } = userData
    const payload = {
        mobile_no: phoneNumber,
        ...rest,
    }
    try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/update/${id}`, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })


        if (status === 201) {
            return data.data
        } else {
            throw new Error("Something Went Wrong")
        }
    } catch (error) {
        throw error;
    }

}