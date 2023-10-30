import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TextInput,
    Dimensions,
    Button,
    Alert, ImageBackground
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';


import firebase from "firebase";



export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true,
            dropdownHeight: 40
        };
    }


    componentDidMount() {
        //this.fetchUser();
    }

    async addStory() {
        if (
            this.state.service &&
            this.state.description && this.state.profession && this.state.price

        ) {
            let storyData = {
                service: this.state.service,
                description: this.state.description,
                profession: this.state.profession,
                price: this.state.price,
                //  author: firebase.auth().currentUser.displayName,
                created_on: new Date(),
                //author_uid: firebase.auth().currentUser.uid,
                likes: 0
            };
            await firebase
                .database()
                .ref(
                    "/posts/" +
                    Math.random()
                        .toString(36)
                        .slice(2)
                )
                .set(storyData)
                .then(function (snapshot) { });
            //this.props.setUpdateToTrue();
            this.props.navigation.navigate("Posts");
        } else {
            Alert.alert(
                "Erro",
                "Todos os campos são obrigatórios!",
                [{ text: "OK", onPress: () => console.log("OK Pressionado") }],
                { cancelable: false }
            );
        }
    }

    // fetchUser = () => {
    //     let theme;
    //     firebase
    //         .database()
    //         .ref("/users/" + firebase.auth().currentUser.uid)
    //         .on("value", snapshot => {
    //             theme = snapshot.val().current_theme;
    //             this.setState({ light_theme: theme === "light" });
    //         });
    // };

    render() {


        return (
            <ImageBackground source={require('../assets/tela-de-fundo.png')}
                style={styles.backgroundImage}>

                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>

                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text
                            style={
                                styles.appTitleText
                            }
                        >
                            Criar anúncio
                        </Text>
                    </View>
                </View>
                <View style={styles.fieldsContainer}>
                    <ScrollView>

                        <View style={{ marginHorizontal: RFValue(10) }}>
                            <Text>Serviço:</Text>
                            <TextInput
                                style={
                                    [styles.inputFont, styles.inputFontExtra,styles.borda]
                                }
                                onChangeText={service => this.setState({ service })}
                                placeholder={"Título- ex: Pintar parede"}
                                placeholderTextColor={
                                    this.state.light_theme ? "black" : "white"
                                }
                            />
                            <Text>Profissão:</Text>

                            <TextInput
                                style={
                                    [styles.inputFont, styles.inputFontExtra,styles.borda]
                                }
                                onChangeText={profession => this.setState({ profession })}
                                placeholder={"Profissão exercida"}
                                placeholderTextColor={
                                    this.state.light_theme ? "black" : "white"
                                }
                            />
                            <Text>Descrição:</Text>
                            <TextInput
                                style={[
                                    styles.inputFont,
                                    styles.inputFontExtra,
                                    styles.inputTextBig,
                                    styles.borda
                                ]}
                                onChangeText={description => this.setState({ description })}
                                placeholder={"Descrição do trabalho"}
                               
                                multiline={false}
                                placeholderTextColor={
                                    this.state.light_theme ? "black" : "white"
                                }
                            />
                           
                            <Text>Preço:</Text>
                            <TextInput
                                style={
                                    [styles.inputFont, styles.inputFontExtra,styles.borda]
                                }
                                onChangeText={price => this.setState({ price })}
                                placeholder={"Preço em R$"}
                                placeholderTextColor={
                                    this.state.light_theme ? "black" : "white"
                                }
                            />

                        </View>
                        <View style={styles.submitButton}>
                            <Button
                                onPress={() => this.addStory()}
                                title="Enviar"
                                color="#841584"
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 0.08 }} />
            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    backgroundImage: { flex: 1, resizeMode: 'cover', },
    container: {
        flex: 1,
        backgroundColor: "#15193c"
    },
    containerLight: {
        flex: 1,
        backgroundColor: "white"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
    },
    appTitleText: {
        color: "black",
        fontSize: RFValue(28),
        //fontFamily: "Bubblegum-Sans"
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28),
        //fontFamily: "Bubblegum-Sans"
    },
    fieldsContainer: {
        flex: 0.85
    },
    previewImage: {
        width: "93%",
        height: RFValue(250),
        alignSelf: "center",
        borderRadius: RFValue(10),
        marginVertical: RFValue(10),
        resizeMode: "contain"
    },
    inputFont: {
        height: RFValue(40),
        borderColor: "white",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "black",
        //        fontFamily: "Bubblegum-Sans"
    },
    inputFontLight: {
        height: RFValue(40),
        borderColor: "black",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "black",
        //        fontFamily: "Bubblegum-Sans"
    },
    dropdownLabel: {
        color: "white",
        //        fontFamily: "Bubblegum-Sans"
    },
    dropdownLabelLight: {
        color: "black",
        //        fontFamily: "Bubblegum-Sans"
    },
    inputFontExtra: {
        marginTop: RFValue(8)
    },
    inputTextBig: {
        textAlignVertical: "top",
        padding: RFValue(5)
    },
    submitButton: {
        marginTop: RFValue(20),
        alignItems: "center",
        justifyContent: "center"
    },
    borda: {
        borderColor:"black",
        borderRadius: 10,
    }
});