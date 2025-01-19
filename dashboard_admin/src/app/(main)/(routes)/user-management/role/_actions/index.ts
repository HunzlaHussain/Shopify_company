import { getServerAuthSession } from "@/lib/auth"
import { AddRoleInput } from "@/validators/add-role"
import axios from "axios"

export const getAllRoles = async () => {
    try {
        const session = await getServerAuthSession()
        const { token, business_id } = session?.user!
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/role`, {
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


export const deleteRole = async (id: number, token: string) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/role/delete/${id}`, null, {
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

export const createRole = async (roleData: AddRoleInput, token: string) => {
    const { name, ...rest } = roleData
    const payload = {
        name: name,
        ...rest,
    }
    try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/role/create`, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })


        if (status === 200) {
            return data.data
        } else {
            throw new Error("Something Went Wrong")
        }
    } catch (error) {
        throw error;
    }
}

export const editRole = async (roleData: AddRoleInput, id: number, token: string) => {
    const { name, ...rest } = roleData
    const payload = {
        name: name,
        ...rest,
    }
    try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/role/update/${id}`, payload, {
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