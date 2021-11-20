import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../Api';
import { UserContext } from '../../contexts/UserContext';

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

export default ({ route }) => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [ipField, setIPField] = useState('');
    const [portField, setPortField] = useState('');
    const [selected, setSelected] = useState(0);

    const defineTitle = () => {
        if (!route.params.id) {
            return 'New';
        }

        return 'Edit';
    }

    const pageTitle = defineTitle();

    const UpdateServer = async () => {
        let token = await AsyncStorage.getItem('token');
        let data = await Api.updateServer(token, route.params.id, nameField, ipField, portField, selected);
        
        if (data.errors) {
            console.log(data);

            if (data.errors.IPAddress) {
                alert(data.errors.IPAddress);
            }
            else if (data.errors.NetflowPort) {
                alert(data.errors.NetflowPort);
            }
            else {
                alert("Ocorreu algum erro!");
            }

            setLoading(false);
            return;
        }
        
        alert("Server updated with success!");
        
        setLoading(false);

        navigation.reset({
            routes: [{name: 'Server'}]
        });
    }

    const handleSaveClick = async () => {
        if (nameField == '' ||
            ipField == '' ||
            portField == '')
        {
            alert("Preencha todos os campos!");
            return
        }

        setLoading(true);

        if (route.params.id) {
            await UpdateServer();
            return;
        }
        
        let token = await AsyncStorage.getItem('token');
        let data = await Api.newServer(token, nameField, ipField, portField, selected);
        
        if (data.errors) {
            console.log(data);

            if (data.errors.IPAddress) {
                alert(data.errors.IPAddress);
            }
            else if (data.errors.NetflowPort) {
                alert(data.errors.NetflowPort);
            }
            else {
                alert("Ocorreu algum erro!");
            }

            setLoading(false);
            return;
        }
        
        alert("Server added with success!");
        
        setLoading(false);

        navigation.reset({
            routes: [{name: 'Server'}]
        });
    }

    const getSNMP = async () => {
        if (!route.params.id) {
            return;
        }

        // setLoading(true);

        let token = await AsyncStorage.getItem('token');
        let data = await Api.getServer(token, route.params.id);
        
        if (data.error == '') {
            alert("erro!");
            return;
        }

        setNameField(data.name);
        setIPField(data.ipAddress);
        setPortField(data.netflowPort.toString());

        let snmps = await getSNMPsArray();

        if (data.snmpId != 0) {
            snmps.forEach(element => {
                if (element.id == data.snmpId) {
                    setSelected(element.id);
                }
            });
        }

        // setLoading(false);
    }

    const getSNMPs = async () => {
        let token = await AsyncStorage.getItem('token');
        let data = await Api.getSNMPs(token);
        
        if (data.error == '') {
            alert("erro!");
            return;
        }

        await setList(data);
    }

    const getSNMPsArray = async () => {
        let token = await AsyncStorage.getItem('token');
        let data = await Api.getSNMPs(token);
        
        if (data.error == '') {
            alert("erro!");
            return;
        }

        return data;
    }

    const onRefresh = async () => {
        setRefreshing(false);
        await getSNMPs();
    }

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

    let items = list.map((item, index) => {
        let key = `V${item.version} - ${item.user}`;
        return ( <Picker.Item key={index} label={key} value={item.id} /> )
    });

    useEffect(async () => {
        await getSNMPs();
        await getSNMP();
    }, [route]);

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
                        {pageTitle} Server
                    </HeaderTitle>
                </HeaderArea>

                {loading && 
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <InputArea>
                    <GenericInput 
                        text="Name"
                        placeholder="Empty name..."
                        value={nameField}
                        onChangeText={t=>setNameField(t)}
                    />

                    <GenericInput 
                        text="IP Address"
                        placeholder="Empty IP Address..."
                        value={ipField}
                        onChangeText={t=>setIPField(t)}
                    />

                    <GenericInput 
                        text="Netflow Port"
                        placeholder="Empty port..."
                        value={portField}
                        onChangeText={t=>setPortField(t)}
                    />

                    <Picker
                        style={styles.card}
                        selectedValue={selected}
                        onValueChange={i => setSelected(i)}
                    >
                        <Picker.Item key="0" label="Select one..." value={0} />
                        {items}
                    </Picker>

                    <CustomButton onPress={handleSaveClick}>
                        <CustomButtonText>Save</CustomButtonText>
                    </CustomButton>
                </InputArea>

            </Scroller>
        </Container>
    );
}
