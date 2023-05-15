import React from 'react';
import { Layout, Header, ButtonText, Takoz, SizeScheme } from 'react-native-pieces';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { View } from 'react-native';
import { ModeTypes } from '../util';

export default function Menu({ navigation }) {

    return (
        <Layout>
            <Header
                title={'WhoAmI'}
                navigation={navigation}
                buttons={[
                    {
                        faIcon: faCircleQuestion,
                        handleClick: () => {
                            window.open("https://mujdecisy.github.io/app/whoami-board-game", "blank");
                        }
                    }
                ]}
            />

            <View style={{minHeight: SizeScheme.get().screen.height.min - 145}}>
                <Takoz />
                <ButtonText
                    label='Characters'
                    handleClick={()=>{navigation.navigate("Main", {mode: ModeTypes.CHARACTERS})}}/>
                <Takoz />
                <ButtonText
                    label='Characters from Turkey'
                    handleClick={()=>{navigation.navigate("Main", {mode: ModeTypes.CHARACTERS_TURKISH})}}/>
                <Takoz />
                <ButtonText
                    label='Countries'
                    handleClick={()=>{navigation.navigate("Main", {mode: ModeTypes.COUNTRIES})}}/>

            </View>

        </Layout>
    );
}