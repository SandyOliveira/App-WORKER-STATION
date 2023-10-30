import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default class ConfigureScreen extends Component {
    render() {
        return (
            <ImageBackground source={require('../assets/rosa.png')}
                style={styles.backgroundImage}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text>Tela de COnfigurações</Text>
                </View>
            </ImageBackground >
        )
    }
}
const styles = StyleSheet.create({
    backgroundImage: { flex: 1, resizeMode: 'cover', },
    routeCard: {
        flex: 0.25,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        borderRadius: 30,
        backgroundColor: '#00008B'
    },
    routeText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
        marginTop: 75,
        paddingLeft: 30
    },
    iconImage: {
        position: "absolute",
        height: 52,
        width: 52,
        resizeMode: "contain",
        right: 20,
        top: 20
    }
})