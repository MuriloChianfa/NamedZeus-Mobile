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

export default () => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    const [userField, setUserField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [selected, setSelected] = useState({});

    const handleSaveClick = async () => {
        setLoading(true);
        
        let token = await AsyncStorage.getItem('token');
        let data = await Api.newSNMP(token, userField, passwordField, selected);
        
        console.log(data);

        if (data.error == '') {
            alert("erro!");
            return;
        }
        
        alert("SNMP added with success!");
        
        setLoading(false);

        navigation.reset({
            routes: [{name: 'SNMP'}]
        });
    }

    // const getSNMP = async () => {
    //     let token = await AsyncStorage.getItem('token');
    //     let data = await Api.getSNMPs(token);
        
    //     if (data.error == '') {
    //         alert("erro!");
    //         return;
    //     }

    //     setList(data);
    // }

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
        // getSNMP();
    }

    // useEffect(() => {
    //     getSNMP();
    // }, []);

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
                        onValueChange={(i) => setSelected(i)}
                    >
                        <Picker.Item key="0" label="Version 2" value="2" />
                        <Picker.Item key="1" label="Version 3" value="3" />
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
