import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { launchImageLibrary } from 'react-native-image-picker';

import Api from '../../Api';
import { UserContext } from '../../contexts/UserContext';

import AccountIcon from '../../assets/account.svg';

import GenericInput from '../../components/GenericInput';

import {
    Container,
    Scroller,
    
    HeaderArea,
    LoadingIcon,

    InputArea,
    CustomButton,
    CustomButtonText,
} from './styles';

export default () => {
    const { state:user } = useContext(UserContext);
    
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [createdAtField, setCreatedAtField] = useState('');
    const [updatedAtField, setUpdatedAtField] = useState('');

    const options = {
        title: 'Select Avatar',
        includeBase64: true,
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const handleSendAvatar = async () => {
        launchImageLibrary(options, async response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                return;
            }

            setLoading(true);

            const base64 = response.assets[0].base64;

            const source = 'data:image/jpeg;base64,' + base64;
    
            let token = await AsyncStorage.getItem('token');

            let data = await Api.setMyAvatar(token, source);
        
            if (data.error) {
                alert("erro!");
                setLoading(false);
                return;
            }

            alert("Saved with success");
            setLoading(false);
        });
    }

    const handleSaveClick = async () => {
        console.log("Clicked...");

        alert("Not implemented!");
    }

    const handleLogoutClick = async () => {
        let res = await Api.logout();

        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    const getMyAccount = async () => {
        // setLoading(true);

        let token = await AsyncStorage.getItem('token');
        // console.log(token);

        let data = await Api.getMyAccount(token, user.id);
        
        if (data.error == '') {
            alert("erro!");
            setLoading(false);
            return;
        }

        console.log(data);

        setNameField(data.name);
        setEmailField(data.email);
        setCreatedAtField(data.createdAt);
        setUpdatedAtField(data.updatedAt);

        setLoading(false);
    }

    const onRefresh = () => {
        setRefreshing(false);
        getMyAccount();
    }

    useEffect(() => {
        getMyAccount();
    }, []);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    {user.avatar != '' ? 
                        <AvatarIcon source={{uri: user.avatar}} />
                        :
                        <AccountIcon width="220" height="220" fill="#FFFFFF" />
                    }
                </HeaderArea>

                {loading && 
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <InputArea>
                    <CustomButton onPress={handleSendAvatar}>
                        <CustomButtonText>Change Avatar</CustomButtonText>
                    </CustomButton>

                    <GenericInput 
                        text="Name"
                        placeholder="Empty name..."
                        value={nameField}
                    />

                    <GenericInput 
                        text="Email"
                        placeholder="Empty email..."
                        value={emailField}
                    />

                    <GenericInput 
                        text="Created At"
                        placeholder="0000-00-00 00:00"
                        value={createdAtField}
                        editable={false}
                    />

                    <GenericInput 
                        text="Updated At"
                        placeholder="0000-00-00 00:00"
                        value={updatedAtField}
                        editable={false}
                    />

                    <CustomButton onPress={handleSaveClick}>
                        <CustomButtonText>Save</CustomButtonText>
                    </CustomButton>
                    <CustomButton onPress={handleLogoutClick}>
                        <CustomButtonText>Logout</CustomButtonText>
                    </CustomButton>
                </InputArea>

            </Scroller>
        </Container>
    );
}
