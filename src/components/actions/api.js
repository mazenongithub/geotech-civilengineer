export async function LogoutUser(clientid) {
    if (!clientid) {
        throw new Error("Missing client ID for logout.");
    }

    const APIURL = `${process.env.REACT_APP_SERVER_API}/geotech/${clientid}/logout`;

    const resp = await fetch(APIURL, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    let data = {};
    try {
        data = await resp.json();
    } catch (_) {
        // ignore parsing errors for empty responses
    }

    if (!resp.ok) {
        throw new Error(data.message || "Logout failed");
    }

    return data;
}

export async function LoginUser(values) {
    const APIURL = `${process.env.REACT_APP_SERVER_API}/geotech/login`;

    const resp = await fetch(APIURL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    });

    let data = {};
    try {
        data = await resp.json();
    } catch (_) {
        // ignore parsing errors if response is empty
    }

    if (!resp.ok) {
        const message = data.message || `Request failed with status ${resp.status}`;
        throw new Error(message);
    }

    return data;
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

export async function CheckUser() {
    const APIURL = `${process.env.REACT_APP_SERVER_API}/geotech/checkuser`;

    const resp = await fetch(APIURL, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    let data = {};
    try {
        data = await resp.json();
    } catch (_) {
        // ignore JSON parsing errors if response is empty
    }

    if (!resp.ok) {
        const message =
            resp.status >= 500
                ? "Please try again later. Server error."
                : data.message || `Request failed with status ${resp.status}`;
        throw new Error(message);
    }

    return data;
}

export async function SaveProject(projectid, values) {
    const APIURL = `${process.env.REACT_APP_SERVER_API}/geotech/gfk/saveproject/${projectid}`;

    try {
        const response = await fetch(APIURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(
                data?.error || 'Request failed or server is not responding'
            );
        }

        return data;

    } catch (err) {
        console.error("SaveProject error:", err);
        throw err instanceof Error ? err : new Error(String(err));
    }
}

export async function SaveProjects(clientid, values) {
    const APIURL = `${process.env.REACT_APP_SERVER_API}/geotech/gfk/saveprojects/${clientid}`;

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

export async function SaveProfile(user) {
    const APIURL = `${process.env.REACT_APP_SERVER_API}/geotech/saveprofile`;

    try {
        const response = await fetch(APIURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ myuser: user }),
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

export async function UploadProfilePhoto(formData) {
    const APIURL = `${process.env.REACT_APP_SERVER_API}/geotech/uploadprofilephoto`;

    try {
        const resp = await fetch(APIURL, {
            method: "POST",
            credentials: "include",
            body: formData
        });

        const data = await resp.json().catch(() => null);

        if (!resp.ok) {
            throw new Error(
                data?.message || "Please try again later, server is not responding"
            );
        }

        return data;

    } catch (err) {
        return Promise.reject(err.message || "Unexpected error occurred");
    }
}
