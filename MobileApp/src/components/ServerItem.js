import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import SNMPIcon from '../assets/server1.svg';

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

const SmallUserNameUp = styled.Text`
    font-size: 14px;
    margin: 4px 0 0 0;
`;

const SmallUserNameMid = styled.Text`
    font-size: 14px;
`;

const SmallUserNameDown = styled.Text`
    font-size: 14px;
    margin: 0 0 6px 0;
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
            navigation.navigate('AddServer', {
                id: data.id
            });
        }}>
            <SNMPIcon width="64" height="64" fill="#FFFFFF" />
            <InfoArea>
                <UserName>Name: {data.name}</UserName>
                <SmallUserNameUp>IPAddress: {data.ipAddress}</SmallUserNameUp>
                <SmallUserNameDown>Netflow Port: {data.netflowPort}</SmallUserNameDown>

                <SeeProfileButton>
                    <SeeProfileButtonText>
                        Show!
                    </SeeProfileButtonText>
                </SeeProfileButton>
            </InfoArea>
        </Area>
    );
}
