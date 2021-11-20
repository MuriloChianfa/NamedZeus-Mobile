import React, { useEffect, useContext } from 'react';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../contexts/UserContext';

import Api from '../../Api';

import NamedZeusLogo from '../../assets/zeus.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {
        const dispatchReceivedData = async json => {    
            if (json.message) {
                alert(json.message);
                return;
            }
        
            if (json.token) {
                await AsyncStorage.setItem('token', json.token);
    
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        id: json.user.id,
                        name: json.user.name,
                        email: json.user.email,
                        avatar: ''
                    }
                });
    
                navigation.reset({
                    routes: [{name: 'MainTab'}]
                });
            }
        }

        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');

            // console.log(token);

            if (!token) {
                console.log("Token not found... returning to login.");

                navigation.reset({
                    routes: [{name: 'SignIn'}]
                });
                return;
            }

            const timeout = new Promise((resolve, reject) => {
                setTimeout(reject, 5000, 'Request timed out');
            });

            const request = Api.refreshToken(token);

            try {
                const json = await Promise
                    .race([timeout, request]);
                
                if (json.error) {
                    await AsyncStorage.removeItem('token');

                    navigation.reset({
                        routes: [{name: 'SignIn'}]
                    });
                }

                dispatchReceivedData(json);
            }
            catch (error) {
                console.log("Not received response on Pre-load... returning to login.");

                navigation.reset({
                    routes: [{name: 'SignIn'}]
                });

                alert("Server not reacheble!");
                return;
            }
        }

        checkToken();
    }, []);

    return (
        <Container>
            <NamedZeusLogo width="100%" height="280" style={{"margin-top": "40px"}} />
            <LoadingIcon size="large" color="#F29999" />
        </Container>
    );
}
