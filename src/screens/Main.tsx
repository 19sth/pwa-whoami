import React, { useState, useEffect } from 'react';
import { useKeepAwake } from 'expo-keep-awake';
import { Layout, Header, SizeScheme } from 'react-native-pieces';
import { View, Text } from 'react-native';
import data from '../data.json';
import dataTurkey from '../data-turkey.json';
import { ModeTypes, getRandomInt } from '../util';
import { faRefresh, faPlay, faMultiply } from '@fortawesome/free-solid-svg-icons';

const enum StepTypes {
    NOT_STARTED,
    IN_PROGRESS,
    HALT
}

const MODE_DATA = {
    [ModeTypes.CHARACTERS]: data,
    [ModeTypes.CHARACTERS_TURKISH]: dataTurkey
}

export default function Main({ navigation, route }) {
    const [num, setNum] = useState(getRandomInt(0, MODE_DATA[route.params.mode].length));
    const [step, setStep] = useState(StepTypes.NOT_STARTED);
    const [waitSec, setWaitSec] = useState(0);
    const [counter, setCounter] = useState(0);
    const size = SizeScheme.get().screen.height.min - 145;

    useKeepAwake();

    useEffect(() => {
        setTimeout(() => {
            const newWaitSec = waitSec - 1;
            if (step === StepTypes.HALT) {
                if (newWaitSec !== -1) {
                    setWaitSec(newWaitSec);
                } else {
                    setCounter(0);
                    setStep(StepTypes.IN_PROGRESS);
                }
            }
        }, 1000);
    }, [waitSec]);

    useEffect(() => {
        setTimeout(() => {
            if (step === StepTypes.IN_PROGRESS) {
                setCounter(counter + 1);
            }
        }, 1000);
    }, [counter, step])

    let button;
    if (step === StepTypes.NOT_STARTED) {
        button = {
            faIcon: faPlay,
            handleClick: () => {
                setStep(StepTypes.HALT);
                setWaitSec(3);
            }
        }
    } else if (step === StepTypes.IN_PROGRESS) {
        button = {
            faIcon: faRefresh,
            handleClick: () => {
                setNum(getRandomInt(0, MODE_DATA[route.params.mode].length));
                setWaitSec(3);
                setStep(StepTypes.HALT);
            }
        }
    } else if (step === StepTypes.HALT) {
        button = {
            faIcon: faMultiply,
            handleClick: () => {
                setStep(StepTypes.NOT_STARTED);
            }
        }
    }

    return (
        <Layout>
            <Header
                title={'WhoAmI'}
                navigation={navigation}
                buttons={[
                    button
                ]}
            />
            <View style={{ minHeight: size }}>
                <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ transform: [{ rotate: '90deg' }] }}>
                        <Text style={{ width: size - 50, textAlign: 'center', fontSize: SizeScheme.get().font.a * 2, fontWeight: 'bold' }}>
                            {(step === StepTypes.IN_PROGRESS) && MODE_DATA[route.params.mode][num]}
                            {(step === StepTypes.HALT) && waitSec}
                            {(step === StepTypes.NOT_STARTED) && '↖︎      Click Play        '}
                        </Text>
                    </View>
                </View>
                <View>
                    <Text>
                        {(step === StepTypes.IN_PROGRESS) && counter.toString()}
                    </Text>
                </View>
            </View>
        </Layout>
    );
}