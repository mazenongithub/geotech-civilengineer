export async function LoginUser(values) {
    const APIURL = `${process.env.REACT_APP_SERVER_API}/geotech/login`;

    try {
        const resp = await fetch(APIURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        // Handle client errors (400–499)
        if (!resp.ok) {
            const errorData = await resp.json().catch(() => ({}));
            const message = errorData.message || `Request failed with status ${resp.status}`;
            throw new Error(message);
        }

        return await resp.json();
    } catch (err) {
        throw err;
    }
}