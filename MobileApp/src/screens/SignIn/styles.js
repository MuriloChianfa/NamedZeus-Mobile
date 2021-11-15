import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #EEEEEE;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #BD4B4B;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

export const MainArea = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const MainTitle = styled.Text`
    width: 293px;
    font-size: 18px;
    font-weight: bold;
    color: #000;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #BD4B4B;
`;

export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #BD4B4B;
    font-weight: bold;
    margin-left: 5px
`;
