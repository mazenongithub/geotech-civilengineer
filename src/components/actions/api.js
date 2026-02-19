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

export async function SaveContactUs(values) {
    const APIURL = `${process.env.REACT_APP_SERVER_API}/geotech/savecontactus`;

    try {
        const response = await fetch(APIURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
           
            const message =
                data.error || 'Request failed or server is not responding';
            throw new Error(message);
        }

        return await response.json();

    } catch (err) {
        throw err instanceof Error ? err : new Error(String(err));
    }
}