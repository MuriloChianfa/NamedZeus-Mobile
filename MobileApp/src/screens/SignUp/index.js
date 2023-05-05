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
import PersonIcon from '../../assets/person.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPassworField] = useState('');

    const handleSignClick = async () => {
        if (emailField == '' && passwordField == '' && passwordField == '') {
            alert("Preecha os campos");
            return;
        }

        let json = await Api.signUp(nameField, emailField, passwordField);
        
        console.log(json);

        if (!json) {
            alert('servidor offline');
            return;
        }

        if (json.errors) {
            console.log(json);
            alert("Ocorreu algum erro!");
            return;
        }

        navigation.reset({
            routes: [{name: 'SignIn'}]
        });

        alert("Usuário criado com sucesso!");
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });    
    }

    return (
        <Container>
            <NamedZeusLogo width="100%" height="220" />

            <InputArea>
                <MainArea>
                    <MainTitle>
                        NamedZeus - Mobile
                    </MainTitle>
                </MainArea>

                <SignInput 
                    IconSvg={PersonIcon}
                    placeholder="Digite seu Nome"
                    value={nameField}
                    onChangeText={t=>setNameField(t)}
                />

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
                    <CustomButtonText>Sign Up</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}
