import React, { useState, setState, useEffect } from 'react';
import { RefreshControl } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Api from '../../Api';

import {
    Container,
    Scroller,
    
    HeaderArea,
    HeaderTitle,
    MainArea,
    MainTitle,
    ListArea,

    LoadingIcon
} from './styles';

import {
    Chart,
    Line,
    Area,
    HorizontalAxis,
    VerticalAxis
} from 'react-native-responsive-linechart';

import data from '../../assets/data';

export default ({ route }) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [serverList, setServerList] = useState([]);

    const [data1, setData1] = useState(data);
    const [data2, setData2] = useState(data);

    const getTraffic = () => {
        // var ws = new WebSocket('ws://192.168.0.124:4444');
        // ws.onmessage = data => {
        //     console.log(data.data);
        //     setData1(data1 => [...data1, parseInt(data.data.traffic)]);
        // };

        // const loop = () => {
        //     console.log('Emiting event...');
        //     ws.send(serverList[0]);
        //     setTimeout(loop, 1000);
        // }
    
        // // kickstart the loop
        // loop();
    }

    const getServers = async () => {
        setLoading(true);

        let token = await AsyncStorage.getItem('token');

        let data = await Api.getServers(token);
        
        if (data.error == '') {
            alert("erro!");
            setLoading(false);
            return;
        }

        setServerList(data);
        setLoading(false);
    }

    const onRefresh = () => {
        setRefreshing(false);
        getServers();
    }

    useEffect(async () => {
        await getServers();
        getTraffic();
    }, [route]);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea style={{marginBottom: 50}}>
                    <HeaderTitle numberOfLines={2}>
                        Dashboard
                    </HeaderTitle>
                </HeaderArea>

                {loading && 
                    <LoadingIcon size="large" color="#FFFFFF" />
                }

                {serverList.map((item, key) => (
                    <ListArea key={key}>
                        <MainArea>
                            <MainTitle>
                                Traffic: {item.ipAddress}
                            </MainTitle>
                        </MainArea>
                        <Chart
                            style={{ height: 200, width: '100%', marginTop: 0 }}
                            padding={{ left: 60, bottom: 20, right: 20, top: 20 }}
                            xDomain={{ min: 0, max: 173 }}
                            yDomain={{ min: 0, max: 20 }}
                        >
                            <VerticalAxis
                                tickCount={10}
                                includeOriginTick={false}
                                theme={{
                                    axis: { stroke: { color: '#000', width: 2 } },
                                    ticks: { stroke: { color: '#000', width: 2 } },
                                    labels: { formatter: (v) => v.toFixed(0) + ' Mbps' },
                                }}
                            />
                            <HorizontalAxis
                                tickCount={9}
                                theme={{
                                    axis: { stroke: { color: '#aaa', width: 2 } },
                                    ticks: { stroke: { color: '#aaa', width: 2 } },
                                    labels: { label: { rotation: 50 }, formatter: Math.round },
                                }}
                            />
                            <Area data={data1} />
                            <Area data={data2} theme={{
                                gradient: {
                                    from: {
                                        color: 'blue',
                                        opacity: 1
                                    },
                                    to: {
                                        color: 'blue',
                                        opacity: 0.2
                                    }
                                }
                            }} />
                        </Chart>
                    </ListArea>
                ))}

                <MainArea></MainArea>
                <MainArea></MainArea>
                <MainArea></MainArea>

            </Scroller>
        </Container>
    );
}