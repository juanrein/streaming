export class ApiError extends Error {
    constructor(data) {
        super();
        this.data = data;
    }
}


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
            return await response.json();
        }
        else {
            throw new ApiError({
                "message": "failed to load page content " + url,
                "statusCode": response.status,
                "statusText": response.statusText,
            })
            // return Promise.reject("failed to fetch " + url);
        }
    } catch (error) {
        throw error;
        // return Promise.reject("failed to fetch " + url);
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
            return await response.json();
        }
        else {
            return Promise.reject("failed to fetch " + url);
        }
    } catch (error) {
        return Promise.reject("failed to fetch " + url);
    }
}

export async function getContent() {
    return getRequest("http://localhost:8000/streaming_app/api/content/")
}

export async function getCategoryData(id) {
    return getRequest(`http://localhost:8000/streaming_app/api/category/${id}/`);
}

export async function getMediaData(id) {
    return getRequest(`http://localhost:8000/streaming_app/api/media/${id}/`);
}

export async function getWatchlistData() {
    return getRequest(`http://localhost:8000/streaming_app/api/watchlist/`);
}

export async function postLogin(username, password) {
    let data = {"username": username, "password": password};
    return postRequest("http://localhost:8000/streaming_app/api/login/", data);
}

export async function postRegister(username, password) {
    let data = {"username": username, "password": password};
    return postRequest("http://localhost:8000/streaming_app/api/register/", data);
}

export async function postLogout() {
    let data = {};
    return postRequest("http://localhost:8000/streaming_app/api/logout/", data);
}

export async function postFavorite(id) {
    let data = {"id": id};
    return postRequest("http://localhost:8000/streaming_app/api/favorite/", data);
}


export async function getEpisodeData(id) {
    return getRequest(`http://localhost:8000/streaming_app/api/episode/${id}/`)
}