const clientId = '6c1b548e63d44f4fb18407a8ee4b8094';
const clientSecret = '4290da996db94fc3ad7130fd36d9a2e3';

let accessToken = '';

async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    accessToken = data.access_token;
    return accessToken;
}

async function searchSpotify(query) {
    if (!accessToken) {
        await getAccessToken();
    }
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return await response.json();
}