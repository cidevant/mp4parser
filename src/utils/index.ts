export async function fetchData() {
    try {
        const data = await fetch('text0.mp4')
    
        return data.arrayBuffer();
    } catch (error) {
        console.error('Failed to fetch data', error);

        throw error;
    }
}
