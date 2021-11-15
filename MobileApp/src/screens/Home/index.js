import React, { useState } from 'react';
import { RefreshControl, Text } from 'react-native';

import {
    Container,
    Scroller,
    
    HeaderArea,
    HeaderTitle,
    MainArea,
    MainTitle,

    LoadingIcon
} from './styles';

export default () => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(false);
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>
                        Basic instructions to install into your server:
                    </HeaderTitle>
                </HeaderArea>

                {loading && 
                    <LoadingIcon size="large" color="#FFFFFF" />
                }

                <MainArea>
                    <MainTitle>
                        1) Install IPTables with dev dependencies
                    </MainTitle>
                </MainArea>

                <Text style={{marginTop: 25, fontWeight: "700"}}>
                    a) What to do for Centos:
                </Text>
                <Text>
                    {`\t\t\t\t`}$ yum install iptables-devel
                </Text>
                <Text style={{marginTop: 10, fontWeight: "700"}}>
                    b) What to do for Debian or Ubuntu:
                </Text>
                <Text>
                    {`\t\t\t\t`}$ apt-get install iptables-dev pkg-config
                </Text>

                <MainArea>
                    <MainTitle>
                        1) Install Net-SNMP with dev dependencies
                    </MainTitle>
                </MainArea>

                <Text style={{marginTop: 25, fontWeight: "700"}}>
                    a) What to do for Centos:
                </Text>
                <Text>
                    {`\t\t\t\t`}$ yum install net-snmp net-snmp-devel
                </Text>
                <Text style={{marginTop: 10, fontWeight: "700"}}>
                    b) What to do for Debian or Ubuntu:
                </Text>
                <Text>
                    {`\t\t\t\t`}$ install snmpd libsnmp-dev
                </Text>

                <MainArea>
                    <MainTitle>
                        3) Compile IPT-Netflow and install them
                    </MainTitle>
                </MainArea>

                <Text style={{marginTop: 25}}>
                    $ git clone git://github.com/aabc/ipt-netflow.git ipt-netflow
                </Text>
                <Text style={{marginTop: 10}}>
                    $ cd ipt-netflow {`&&`} ./configure {`&&`} make all install
                </Text>

                <MainArea>
                    <MainTitle>
                        4) Enable the module
                    </MainTitle>
                </MainArea>

                <Text style={{marginTop: 25, fontWeight: "700"}}>
                    You can load module directly by insmod like this:
                </Text>
                <Text style={{marginTop: 10}}>
                    $ insmod ipt_NETFLOW.ko destination=127.0.0.1:2055 debug=1
                </Text>
                <Text style={{marginTop: 10, fontWeight: "700"}}>
                    Or if properly installed (make install; depmod) by this:
                </Text>
                <Text style={{marginTop: 10}}>
                    $ modprobe ipt_NETFLOW destination=127.0.0.1:2055
                </Text>
                <Text style={{marginTop: 10, fontWeight: "700"}}>
                    See, you may add options in insmod/modprobe command line, or add
                    them in /etc/modprobe.conf or /etc/modprobe.d/ipt_NETFLOW.conf
                    like thus:
                </Text>
                <Text style={{marginTop: 10}}>
                    options ipt_NETFLOW destination=127.0.0.1:2055 protocol=9 natevents=1
                </Text>

                <MainArea></MainArea>
                <MainArea></MainArea>
                <MainArea></MainArea>
            </Scroller>
        </Container>
    );
}