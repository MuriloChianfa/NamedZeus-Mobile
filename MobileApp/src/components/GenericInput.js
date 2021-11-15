import React from 'react';
import styled from 'styled-components/native';
import { Text } from "react-native";

const InputArea = styled.View`
    width: 100%;
    height: 40px;
    background-color: #F29999;
    flex-direction: row;
    border-radius: 5px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 14px;
    color: #BD4B4B;
    margin-left: 6px;
    margin-top: 4px;
`;

export default ({text, placeholder, value, onChangeText, editable}) => {
    return (
        <InputArea>
            <Text>
                {text}:
            </Text>
            <Input
                placeholder={placeholder}
                placeholderTextColor="#BD4B4B"
                value={value}
                onChangeText={onChangeText}
                editable={editable}
            />
        </InputArea>
    );
}
