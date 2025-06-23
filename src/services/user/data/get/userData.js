import { fetchDataUserPARAM } from "../../../global/preset/fetchPreset";

const getUserById = async (id) => {
    try {
        const data = await fetchDataUserPARAM("getUserById", id);
        return data;
    } catch (error) {
        console.error("Error fetching album data:", error);
    }
}

export default getUserById;