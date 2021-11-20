import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';

import Api from '../../Api';

import {
    Container,
    Scroller,
    
    HeaderArea,
    HeaderTitle,
    SearchButton,
    
    LocationArea,
    LocationInput,

    LoadingIcon,
    ListArea
} from './styles';

import SNMPItem from '../../components/SNMPItem';

import SearchIcon from '../../assets/search.svg';
import PlusIcon from '../../assets/plus1.svg';

export default () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getSNMPs = async () => {
        setLoading(true);

        let token = await AsyncStorage.getItem('token');

        let data = await Api.getSNMPs(token);
        
        if (data.error == '') {
            alert("erro!");
            setLoading(false);
            return;
        }

        setList(data);
        setLoading(false);
    }

    const onRefresh = () => {
        setRefreshing(false);
        getSNMPs();
    }

    const handleLocationSearch = () => {
        getSNMPs();
    }

    useEffect(() => {
        getSNMPs();
    }, []);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>
                        SNMP configurations
                        <SearchButton onPress={()=>navigation.navigate('AddSNMP', { id: false })}>
                            <PlusIcon
                                width="26"
                                height="26"
                                fill="#FF0000"
                                style={{marginTop: 5}}
                            ></PlusIcon>
                        </SearchButton>
                    </HeaderTitle>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Filter..."
                        placeholderTextColor="#FFFFFF"
                        onEndEditing={handleLocationSearch}
                    />
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </LocationArea>

                {loading && 
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <ListArea>
                    {list.map((item, k) => (
                        <SNMPItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}