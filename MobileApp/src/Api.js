import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'http://192.168.0.124:49154/api';

export default {
    checkToken: async (token) => {
        const formData = new FormData();

        formData.append("token", token);

        const req = await fetch(`${BASE_API}/refresh`, {
            method: 'POST',
            header: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        });
        const json = await req.json();
        return json;
    },
    signIn: async (email, password) => {
        return await (await fetch(`${BASE_API}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })).json();
    },
    signUp: async (name, email, password) => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        const req = await fetch(`${BASE_API}/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        });
        const json = await req.json();
        return json;
    },
    refreshToken: async (token) => {
        return await (await fetch(`${BASE_API}/refresh`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })).json();
    },
    setMyAvatar: async (token, avatarData) => {
        return await (await fetch(`${BASE_API}/users/avatar`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(avatarData)
        })).json();
    },
    getMyAccount: async (token, id) => {
        return await (await fetch(`${BASE_API}/users/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })).json();
    },
    getSNMPs: async (token) => {
        return await (await fetch(`${BASE_API}/snmps`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })).json();
    },
    getServers: async (token) => {
        return await (await fetch(`${BASE_API}/servers`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })).json();
    },
    newServer: async (token, name, ipAddress, port, snmpId) => {
        return await (await fetch(`${BASE_API}/servers`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                ipAddress: ipAddress,
                netflowPort: port,
                snmpId: snmpId
            })
        })).json();
    },
    newSNMP: async (token, user, password, version) => {
        return await (await fetch(`${BASE_API}/snmps`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user: user,
                password: password,
                version: version
            })
        })).json();
    },
    logout: async () => {
        AsyncStorage.removeItem('token');
    }
};
