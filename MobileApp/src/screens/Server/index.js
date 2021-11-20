import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../Api';

import {
    Container,
    Scroller,
    
    HeaderArea,
    HeaderTitle,
    SearchButton,
    
    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea
} from './styles';

import ServerItem from '../../components/ServerItem';

import SearchIcon from '../../assets/search.svg';
import PlusIcon from '../../assets/plus1.svg';

export default ({ route }) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getServers = async () => {
        setLoading(true);

        let token = await AsyncStorage.getItem('token');

        let data = await Api.getServers(token);
        
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
        getServers();
    }

    const handleFilterServers = () => {
        getServers();
    }

    useEffect(() => {
        getServers();
    }, [route]);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>
                        My Servers
                        <SearchButton onPress={()=>navigation.navigate('AddServer', { id: false })}>
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
                        onEndEditing={handleFilterServers}
                    />
                    <SearchButton onPress={() => { handleFilterServers(); }}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </LocationArea>

                {loading && 
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <ListArea>
                    {list.map((item, k) => (
                        <ServerItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}