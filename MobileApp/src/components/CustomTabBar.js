import React, { useContext } from 'react';
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import ServerIcon from '../assets/server1.svg';
import DashboardsIcon from '../assets/dashboard1.svg';
import SNMPIcon from '../assets/snmp1.svg';
import AccountIcon from '../assets/account.svg';

const TabArea = styled.View`
    height: 60px;
    background-color: #F29999;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #F29999;
    margin-top: -20px;
`;

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({ state, navigation }) => {
    const { state:user } = useContext(UserContext);

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }
    
    return (
        <TabArea>
            <TabItem onPress={() => goTo('Home')}>
                <HomeIcon style={{opacity: state.index===0? 1 : 0.6}} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItem onPress={() => goTo('Server')}>
                <ServerIcon style={{opacity: state.index===1? 1 : 0.6, color: "#000"}} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItemCenter onPress={() => goTo('Dashboard')}>
                <DashboardsIcon width="75" height="75" fill="#F29999" style={{opacity: 0.8}} />
            </TabItemCenter>
            <TabItem onPress={() => goTo('SNMP')}>
                <SNMPIcon style={{opacity: state.index===3? 1 : 0.6, color: "#fff", "background-color": "#fff"}} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItem onPress={() => goTo('Profile')}>
                {user.avatar != '' ? 
                    <AvatarIcon source={{uri: user.avatar}} />
                    :
                    <AccountIcon style={{opacity: state.index===4? 1 : 0.6}} width="24" height="24" fill="#FFFFFF" />
                }
            </TabItem>
        </TabArea>
    );
}
