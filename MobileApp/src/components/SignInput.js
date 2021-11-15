import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #F29999;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #BD4B4B;
    margin-left: 10px;
`;

export default ({IconSvg, placeholder, value, onChangeText}) => {
    return (
        <InputArea>
            <IconSvg width="24" height="24" fill="#BD4B4B" />
            <Input
                placeholder={placeholder}
                placeholderTextColor="#BD4B4B"
                value={value}
                onChangeText={onChangeText}
            />
        </InputArea>
    );
}
