import img0 from "./temp/desperado.jpg";
import img1 from "./temp/forrest_gump.jpg";
import img2 from "./temp/kunniottomat_paskiaiset.jpg";
import img3 from "./temp/media0.jpg";
import img4 from "./temp/media1.jpg";
import img5 from "./temp/media2.jpg";
import forest from "./temp/Forest.mp4";

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

export async function getCategoryData(id) {
    try {
        const response = await fetch(`http://localhost:8000/streaming_app/category/${id}`);
        if (response.ok && response.status === 200) {
            let categoryData = await response.json();
            return categoryData;
        }
    } catch (error) {
        
    }
    return {
        "category": "section 1",
        "id": id,
        "items": [
            {
                "id": 0,
                "thumbnailUrl": img0
            },
            {
                "id": 1,
                "thumbnailUrl": img1
            },
            {
                "id": 2,
                "thumbnailUrl": img2
            }
        ]
    }
}

export async function getMediaData(id) {
    try {
        const response = await fetch(`http://localhost:8000/streaming_app/media/${id}`);
        if (response.ok && response.status === 200) {
            let mediaData = await response.json();
            return mediaData;
        }
    } catch (error) {

    }

    return {
        "type": "movie",
        "url": forest,
        "title": "Forrest Gump"
    };
}

export async function getWatchlistData() {
    try {
        const response = await fetch(`http://localhost:8000/streaming_app/watchlist/`);
        if (response.ok && response.status === 200) {
            let mediaData = await response.json();
            return mediaData;
        }
    } catch (error) {

    }

    return {
        "success": true,
        "favorites": [
        {
            "id": 0,
            "thumbnailUrl": img0
        },
        {
            "id": 1,
            "thumbnailUrl": img1
        },
        {
            "id": 2,
            "thumbnailUrl": img2
        }
    ]}
}

export async function postLogin(username, password) {
    const csrftoken = getCookie('csrftoken');

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch("http://localhost:8000/streaming_app/login/", {
        method: "POST",
        headers: {
            'X-CSRFToken': csrftoken
        },
        body: formData
    });
    const data = await response.json(); 
    return data;
}

export async function postRegister(username, password) {
    const csrftoken = getCookie('csrftoken');

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch("http://localhost:8000/streaming_app/register/", {
        method: "POST",
        headers: {
            'X-CSRFToken': csrftoken
        },
        body: formData
    });
    const data = await response.json(); 
    return data;
}

export async function postLogout() {
    const csrftoken = getCookie('csrftoken');

    const formData = new FormData();

    const response = await fetch("http://localhost:8000/streaming_app/logout/", {
        method: "POST",
        headers: {
            'X-CSRFToken': csrftoken
        },
        body: formData
    });
    const data = await response.json(); 
    return data;
}

export async function postFavorite(id) {
    const csrftoken = getCookie('csrftoken');

    const formData = new FormData();
    formData.append("id", id);

    const response = await fetch("http://localhost:8000/streaming_app/favorite/", {
        method: "POST",
        headers: {
            'X-CSRFToken': csrftoken
        },
        body: formData
    });
    const data = await response.json(); 
    return data;
}


export async function getEpisodeData(id) {
    try {
        const response = await fetch(`http://localhost:8000/streaming_app/episode/${id}`);
        if (response.ok && response.status === 200) {
            let episodeData = await response.json();
            return episodeData;
        }
    } catch (error) {

    }

    return {
        "number": 0,
        "title": "episode",
        "url": {forest}
    }
}