import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../Api';

import GenericInput from '../../components/GenericInput';
import BackIcon from '../../assets/back.svg';

import {
    Container,
    Scroller,
    
    HeaderArea,
    HeaderTitle,
    LoadingIcon,

    InputArea,
    CustomButton,
    CustomButtonText,
} from './styles';

export default ({ route }) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    const [userField, setUserField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [selected, setSelected] = useState(2);

    const UpdateSNMP = async () => {
        let token = await AsyncStorage.getItem('token');
        let data = await Api.updateSNMP(token, route.params.id, userField, passwordField, selected);
        
        if (data.errors) {
            console.log(data);

            if (data.errors.Password) {
                alert(data.errors.Password);
            }
            else if (data.errors.User) {
                alert(data.errors.User);
            }
            else {
                alert("Ocorreu algum erro!");
            }

            setLoading(false);
            return;
        }
        
        alert("SNMP updated with success!");
        
        setLoading(false);

        navigation.reset({
            routes: [{name: 'SNMP'}]
        });
    }

    const handleSaveClick = async () => {
        if (userField == '' ||
            passwordField == '')
        {
            alert("Preencha todos os campos!");
            return;
        }

        setLoading(true);

        if (route.params.id) {
            await UpdateSNMP();
            return;
        }
        
        let token = await AsyncStorage.getItem('token');
        let data = await Api.newSNMP(token, userField, passwordField, selected);
        
        if (data.errors) {
            console.log(data);

            if (data.errors.Password) {
                alert(data.errors.Password);
            }
            else if (data.errors.User) {
                alert(data.errors.User);
            }
            else {
                alert("Ocorreu algum erro!");
            }

            setLoading(false);
            return;
        }
        
        alert("SNMP added with success!");
        
        setLoading(false);

        navigation.reset({
            routes: [{name: 'SNMP'}]
        });
    }

    const getSNMP = async () => {
        if (!route.params.id) {
            return;
        }

        // setLoading(true);

        let token = await AsyncStorage.getItem('token');
        let data = await Api.getSNMP(token, route.params.id);
        
        if (data.error == '') {
            alert("erro!");
            return;
        }

        setUserField(data.user);
        setPasswordField(data.password);
        setSelected(data.version);

        // setLoading(false);
    }

    const styles = StyleSheet.create({
        card: {
            borderWidth: 1,
            width: "100%",
            height: 5,
            maxHeight: 20,
            borderRadius: 10,
            backgroundColor: "#F29999",
            marginBottom: 15,
            fontSize: 18
        },
    });

    const onRefresh = () => {
        setRefreshing(false);
        getSNMP();
    }

    useEffect(() => {
        getSNMP();
    }, [route]);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <BackIcon width="24" height="24" fill="#000" style={{marginTop: 4}} onPress={() => {
                        navigation.goBack();
                    }}></BackIcon>
                    <HeaderTitle numberOfLines={2}>
                        New SNMP
                    </HeaderTitle>
                </HeaderArea>

                {loading && 
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <InputArea>
                    <Picker
                        style={styles.card}
                        selectedValue={selected}
                        onValueChange={i => setSelected(i)}
                    >
                        <Picker.Item key="2" label="Version 2" value={2} />
                        <Picker.Item key="3" label="Version 3" value={3} />
                    </Picker>

                    <GenericInput 
                        text="Username"
                        placeholder="Empty username..."
                        value={userField}
                        onChangeText={t=>setUserField(t)}
                    />

                    <GenericInput 
                        text="Password"
                        placeholder="Empty password..."
                        value={passwordField}
                        onChangeText={t=>setPasswordField(t)}
                    />

                    <CustomButton onPress={handleSaveClick}>
                        <CustomButtonText>Save</CustomButtonText>
                    </CustomButton>
                </InputArea>

            </Scroller>
        </Container>
    );
}
