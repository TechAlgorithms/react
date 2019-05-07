import axios from 'axios';

async function login(uname, password) {
    let params = {
        uname: uname,
        password: password
    };

    let res = await axios.post('/api/login', params);

    if (res.data.jwt) {
        sessionStorage.setItem('ops.auth.token', res.data.jwt);
        sessionStorage.setItem('ops.auth.superuser', res.data.superuser);
        return 1;
    }
    else {
        throw new Error(res.data.error);
    }
}

function authHeader() {
    let token = sessionStorage.getItem('ops.auth.token'); let headers = {
        'Authorization': 'Bearer ' + token
    };
    return { headers: headers };
}

async function liveEvents() {
    let res = await axios.get('/api/live-events', authHeader());
    return res.data;
}

async function globalLocations() {
    let res = await axios.get('/api/global-locations', authHeader());
    return res.data;
}
