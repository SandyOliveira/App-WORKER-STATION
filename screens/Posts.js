import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,TouchableOpacity
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import AppLoading from "expo-app-loading";


import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";

import StoryCard from "./StoryCard";



export default class FoodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
            stories: []
        };
    }


    componentDidMount() {
        this.fetchStories();
        //this.fetchUser();
    }

    fetchStories = () => {
        firebase
            .database()
            .ref("/posts/")
            .on(
                "value",
                snapshot => {
                    let stories = [];
                    if (snapshot.val()) {
                        Object.keys(snapshot.val()).forEach(function (key) {
                            stories.push({
                                key: key,
                                value: snapshot.val()[key]
                            });
                        });
                    }
                    this.setState({ stories: stories });
                    //this.props.setUpdateToFalse();
                },
                function (errorObject) {
                    console.log("A leitura falhou: " + errorObject.code);
                }
            );
    };

    //   fetchUser = () => {
    //     let theme;
    //     firebase
    //       .database()
    //       .ref("/users/" + firebase.auth().currentUser.uid)
    //       .on("value", snapshot => {
    //         theme = snapshot.val().current_theme;
    //         this.setState({ light_theme: theme === "light" });
    //       });
    //   };

    renderItem = ({ item: story }) => {
        return <StoryCard story={story} navigation={this.props.navigation} />;
    };

    keyExtractor = (item, index) => index.toString();

    render() {

        return (
            <View
                style={
                    styles.container
                }
            >
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
                            Serviços
                        </Text>
                    </View>
                </View>
                {!this.state.stories[0] ? (
                    <View style={styles.noStories}>
                        <Text
                            style={
                                styles.noStoriesText
                            }
                        >
                            Nenhuma Registro Disponível
                        </Text>
                    </View>
                ) : (
                    <View style={styles.cardContainer}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.stories}
                            renderItem={this.renderItem}
                        />
                    </View>
                )}
                <View style={{ flex: 0.02 }} />
              
            </View>

        );
    }
}


const styles = StyleSheet.create({
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
        color: "white",
        fontSize: RFValue(28),
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28),
    },
    cardContainer: {
        flex: 0.85
    },
    noStories: {
        flex: 0.85,
        justifyContent: "center",
        alignItems: "center"
    },
    noStoriesTextLight: {
        fontSize: RFValue(40),
    },
    noStoriesText: {
        color: "white",
        fontSize: RFValue(40),
    },
    btn:{
        marginLeft: 150,
        borderRadius: 30,
        backgroundColor: '#00008B',
        height:55,
        width:55
    },
    routeText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
        marginTop: 8,
        paddingLeft: 20
    },
});