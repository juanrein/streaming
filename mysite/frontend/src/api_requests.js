export class ApiError extends Error {
    constructor(data) {
        super();
        this.data = data;
    }
}

const BASE_URL = "http://localhost:8000"


/**
 * https://docs.djangoproject.com/en/4.1/howto/csrf/
 */
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/**
 * sends post request with csrf token 
 * returns the json response
 */
async function postRequest(url, data) {
    const csrftoken = getCookie('csrftoken');

    const formData = new FormData();
    for (let [name, value] of Object.entries(data)) {
        formData.append(name, value);
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'X-CSRFToken': csrftoken
            },
            body: formData
        });
        if (response.ok && response.status === 200) {
            let contentType = response.headers.get("Content-Type");
            if (contentType.includes("text/html")) {
                return await response.text();
            }
            else if (contentType.includes("application/json")) {
                return await response.json();
            }
            else {
                console.error("unknown content-type " + response.headers.get("Content-Type"))
            }
        }
        else {
            let errorText = await response.text();
            throw new ApiError({
                "message": errorText,
                "statusCode": response.status,
                "statusText": response.statusText,
            })
        }
    } catch (error) {
        throw error;
    }

}



/**
 * sends the get request 
 * return json response
 */
async function getRequest(url) {
    try {
        const response = await fetch(url);
        if (response.ok && response.status === 200) {
            let contentType = response.headers.get("Content-Type");
            if (contentType.includes("text/html")) {
                return await response.text();
            }
            else if (contentType.includes("application/json")) {
                return await response.json();
            }
            else {
                console.error("unknown content-type " + response.headers.get("Content-Type"))
            }
        }
        else {
            let errorMessage = await response.text();
            throw new ApiError({
                "message": errorMessage,
                "statusCode": response.status,
                "statusText": response.statusText,
            })
        }
    } catch (error) {
        throw error;
    }
}

/**
 * sends the get request 
 * return json response
 */
export async function deleteRequest(url) {
    const csrftoken = getCookie('csrftoken');
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'X-CSRFToken': csrftoken
            }
        });
        if (response.ok && response.status === 200) {
            let contentType = response.headers.get("Content-Type");
            if (contentType.includes("text/html")) {
                return await response.text();
            }
            else if (contentType.includes("application/json")) {
                return await response.json();
            }
            else {
                console.error("unknown content-type " + response.headers.get("Content-Type"))
            }
        }
        else {
            let errorMessage = await response.text();
            throw new ApiError({
                "message": errorMessage,
                "statusCode": response.status,
                "statusText": response.statusText,
            })
        }
    } catch (error) {
        throw error;
    }
}

export async function getContent() {
    return getRequest(`${BASE_URL}/streaming_app/api/content/`)
}

export async function getCategoryData(id) {
    return getRequest(`${BASE_URL}/streaming_app/api/category/${id}/`);
}

export async function getMediaData(id) {
    return getRequest(`${BASE_URL}/streaming_app/api/media/${id}/`);
}

export async function getWatchlistData() {
    return getRequest(`${BASE_URL}/streaming_app/api/watchlist/`);
}

export async function postLogin(username, password) {
    let data = {"username": username, "password": password};
    return postRequest(`${BASE_URL}/streaming_app/api/login/`, data);
}

export async function postRegister(username, password) {
    let data = {"username": username, "password": password};
    return postRequest(`${BASE_URL}/streaming_app/api/register/`, data);
}

export async function postLogout() {
    let data = {};
    return postRequest(`${BASE_URL}/streaming_app/api/logout/`, data);
}

export async function postFavorite(id) {
    let data = {"id": id};
    return postRequest(`${BASE_URL}/streaming_app/api/favorite/`, data);
}

export async function deleteFavorite(id) {
    return deleteRequest(`${BASE_URL}/streaming_app/api/delete_favorite/${id}/`)
}


export async function getEpisodeData(id) {
    return getRequest(`${BASE_URL}/streaming_app/api/episode/${id}/`)
}

export async function getUserInfo() {
    return getRequest(`${BASE_URL}/streaming_app/api/userinfo/`)
}