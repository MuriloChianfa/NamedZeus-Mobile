import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../contexts/UserContext';

import { 
    Container,
    InputArea,

    CustomButton,
    CustomButtonText,

    MainArea,
    MainTitle,

    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput';

import NamedZeusLogo from '../../assets/zeus.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPassworField] = useState('');

    const handleSignClick = async () => {
        if (emailField == '' && passwordField == '') {
            alert("Preecha os campos");
        }

        let json = await Api.signIn(emailField, passwordField);
        
        if (!json) {
            alert('servidor offline');
            return;
        }

        dispatchReceivedData(json);
    }

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

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
        });    
    }

    return (
        <Container>
            <NamedZeusLogo width="100%" height="280" style={{"margin-top": "50px"}} />

            <InputArea>
                <MainArea>
                    <MainTitle>
                        NamedZeus - Server traffic analyzer
                    </MainTitle>
                </MainArea>

                <SignInput 
                    IconSvg={EmailIcon}
                    placeholder="Digite seu E-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />

                <SignInput 
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t=>setPassworField(t)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Sign In</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}
