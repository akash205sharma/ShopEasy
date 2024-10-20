
export async function updateUser(profile) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile),  // Convert the product data to JSON
        });

        if (!res.ok) {
            throw new Error(`Failed to update User Profile. Status: ${res.status}`);
        }
        else console.log("Updated successfully",res)
        // const data = await res.json();
        // return data;

    } catch (error) {

        console.error("Error updating User Profile:", error);
        return { error: 'Failed to update User Profile' };
    }
}
