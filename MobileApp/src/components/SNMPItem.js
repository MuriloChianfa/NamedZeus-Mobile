import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import SNMPIcon from '../assets/snmp1.svg';

import AsyncStorage from '@react-native-community/async-storage';
import Api from '../Api';

const Area = styled.View`
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

const SmallUserName = styled.Text`
    font-size: 14px;
    margin: 4px 0 4px 0;
`;

const SeeProfileButton = styled.TouchableOpacity`
    width: 145px;
    height: 26px;
    border: 1px solid #F29999;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
`;

const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #BD4B4B;
`;

const DeleteSNMPButton = styled.TouchableOpacity`
    width: 22px;
    height: 22px;
    border: 1px solid #F29999;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 8px;
    right: 8px;
`;

export default ({data}) => {
    const navigation = useNavigation();

    const deleteItem = async id => {
        console.log(`Deleting SNMP id ${id}`);

        let token = await AsyncStorage.getItem('token');
        let data = await Api.deleteSNMP(token, id);
        
        if (data.errors) {
            console.log(data);

            alert("Ocorreu algum erro!");
            return;
        }
        
        alert("SNMP deleted with success!");

        navigation.reset({
            routes: [{name: 'SNMP'}]
        });
    }

    return (
        <Area>
            <SNMPIcon width="64" height="64" fill="#FFFFFF" />
            <InfoArea>
                <UserName>Username: {data.user}</UserName>
                <SmallUserName>Version: {data.version}</SmallUserName>

                <SeeProfileButton onPress={() => {
                    navigation.navigate('AddSNMP', {
                        id: data.id
                    });
                }}>
                    <SeeProfileButtonText>Show!</SeeProfileButtonText>
                </SeeProfileButton>
            </InfoArea>

            <DeleteSNMPButton onPress={() => {
                deleteItem(data.id);
            }}>
                <SeeProfileButtonText>
                    X
                </SeeProfileButtonText>
            </DeleteSNMPButton>
        </Area>
    );
}
