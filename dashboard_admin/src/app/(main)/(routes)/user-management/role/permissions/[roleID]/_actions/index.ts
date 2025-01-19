import { getServerAuthSession } from "@/lib/auth"
import { AddPermissionInput } from "@/validators/add-permission"
import axios from "axios"

export const getAllUsers = async () => {
    try {
        const session = await getServerAuthSession()
        const { token, business_id } = session?.user!
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/permission?`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
                business_id: business_id,
                per_page: -1,
                role_id: 246, 
               
            },
        })

        return data.data
    } catch (error) {
        throw error
    }
}

export const createPermission = async (permissionData: AddPermissionInput, token: string) => {
    const { can_create, ...rest } = permissionData
    const payload = {
        can_create: can_create,
        ...rest,
    }
    try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/permission`, payload, {
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



export const editPermission = async (permissionData: AddPermissionInput, id: number, token: string) => {
    const { can_create, ...rest } = permissionData
    const payload = {
        can_create: can_create,
        ...rest,
    }
    try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/permission/edit/${id}`, payload, {
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