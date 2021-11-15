import React, { useState } from 'react';
import { RefreshControl, Tooltip } from 'react-native';

import {
    Container,
    Scroller,
    
    HeaderArea,
    HeaderTitle,
    MainArea,
    MainTitle,

    LoadingIcon
} from './styles';

import {
    Chart,
    Line,
    Area,
    HorizontalAxis,
    VerticalAxis
} from 'react-native-responsive-linechart';

export default () => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [list, setList] = useState([
        { x: -2, y: 15 },
        { x: -1, y: 10 },
        { x: 0, y: 12 },
        { x: 1, y: 7 },
        { x: 2, y: 6 },
        { x: 3, y: 3 },
        { x: 4, y: 5 },
        { x: 5, y: 8 },
        { x: 6, y: 12 },
        { x: 7, y: 14 },
        { x: 8, y: 12 },
        { x: 9, y: 13.5 },
        { x: 10, y: 18 },
    ]);

    const onRefresh = () => {
        setRefreshing(false);
    }

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

                <MainArea>
                    <MainTitle>
                        Interface: ensp03
                    </MainTitle>
                </MainArea>

                <Chart
                    style={{ height: 200, width: '100%', marginTop: 0 }}
                    data={list}
                    padding={{ left: 60, bottom: 20, right: 20, top: 20 }}
                    xDomain={{ min: 0, max: 500 }}
                    yDomain={{ min: -4, max: 20 }}
                >
                    <VerticalAxis
                        tickCount={10}
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
                    <Area />
                </Chart>
                
                <MainArea>
                    <MainTitle>
                        Interface: ensp04
                    </MainTitle>
                </MainArea>

                <Chart
                    style={{ height: 200, width: '100%', marginTop: 0 }}
                    data={list}
                    padding={{ left: 60, bottom: 20, right: 20, top: 20 }}
                    xDomain={{ min: 0, max: 500 }}
                    yDomain={{ min: -4, max: 20 }}
                >
                    <VerticalAxis
                        tickCount={10}
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
                    <Area />
                </Chart>

                <MainArea>
                    <MainTitle>
                        Interface: ensp05
                    </MainTitle>
                </MainArea>

                <Chart
                    style={{ height: 200, width: '100%', marginTop: 0 }}
                    data={list}
                    padding={{ left: 60, bottom: 20, right: 20, top: 20 }}
                    xDomain={{ min: 0, max: 500 }}
                    yDomain={{ min: -4, max: 20 }}
                >
                    <VerticalAxis
                        tickCount={10}
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
                    <Area />
                </Chart>

                <MainArea></MainArea>
                <MainArea></MainArea>
                <MainArea></MainArea>

            </Scroller>
        </Container>
    );
}