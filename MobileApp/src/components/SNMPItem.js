import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import Stars from '../components/Stars';
import SNMPIcon from '../assets/snmp1.svg';

const Area = styled.TouchableOpacity`
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

const SeeProfileButton = styled.View`
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

export default ({data}) => {
    const navigation = useNavigation();

    return (
        <Area onPress={() => {
            navigation.navigate('AddSNMP', {
                id: data.id
            });
        }}>
            <SNMPIcon width="64" height="64" fill="#FFFFFF" />
            <InfoArea>
                <UserName>Username: {data.user}</UserName>
                <SmallUserName>Version: {data.version}</SmallUserName>

                {/* <Stars stars={data.stars} showNumber={true} /> */}

                <SeeProfileButton>
                    <SeeProfileButtonText>Show!</SeeProfileButtonText>
                </SeeProfileButton>
            </InfoArea>
        </Area>
    );
}
