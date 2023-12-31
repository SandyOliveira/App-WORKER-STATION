import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";


export default class StoryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            light_theme: true,
            story_id: this.props.story.key,
            story_data: this.props.story.value,
            is_liked: false,
            likes: this.props.story.value.likes
        };
    }



    componentDidMount() {
        //this.fetchUser();
    }

    likeAction = () => {
        if (this.state.is_liked) {
            firebase
                .database()
                .ref("posts")
                .child(this.state.story_id)
                .child("likes")
                .set(firebase.database.ServerValue.increment(-1));
            this.setState({ likes: (this.state.likes -= 1), is_liked: false });
        } else {
            firebase
                .database()
                .ref("posts")
                .child(this.state.story_id)
                .child("likes")
                .set(firebase.database.ServerValue.increment(1));
            this.setState({ likes: (this.state.likes += 1), is_liked: true });
        }
    };

    fetchUser = () => {
        let theme;
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", snapshot => {
                theme = snapshot.val().current_theme;
                this.setState({ light_theme: theme === "light" });
            });
    };

    render() {
        let story = this.state.story_data;

        return (
            <View
                style={styles.container}
               
            >
                <SafeAreaView style={styles.droidSafeArea} />
                <View
                    style={
                        styles.cardContainer
                    }
                >

                    <View style={styles.titleContainer}>
                        <View style={styles.titleTextContainer}>
                            <Text
                                style={
                                    styles.title
                                }
                            >
                            {story.service}
                            </Text>
                            <Text
                                style={
                                    styles.textsubs
                                }
                            >
                               Profissão: {story.profession}
                            </Text>
                            <Text
                                style={
                                    styles.descriptionText
                                }
                            >
                                Descrição: {story.description}
                            </Text>
                            <Text
                                style={
                                    styles.textsubs
                                }
                            >
                            Valor do serviço: {story.price}
                            </Text>
                          

                        </View>
                    </View>

                    <View style={styles.actionContainer}>
                        <TouchableOpacity
                            style={
                                styles.likeButtonDisliked
                            }
                            onPress={() => this.likeAction()}
                        >
                            <Ionicons
                                name={"heart"}
                                size={RFValue(30)}
                                color={this.state.light_theme ? "black" : "white"}
                            />

                            <Text
                                style={
                                    this.state.light_theme
                                        ? styles.likeTextLight
                                        : styles.likeText
                                }
                            >
                                {this.state.likes}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    cardContainer: {
        margin: RFValue(13),
        backgroundColor: "#2f345d",
        borderRadius: RFValue(20)
    },
    cardContainerLight: {
        margin: RFValue(13),
        backgroundColor: "white",
        borderRadius: RFValue(20),
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: RFValue(0.5),
        shadowRadius: RFValue(5),
        elevation: RFValue(2)
    },
    storyImage: {
        resizeMode: "contain",
        width: "95%",
        alignSelf: "center",
        height: RFValue(250)
    },
    titleContainer: {
        paddingLeft: RFValue(20),
        justifyContent: "center"
    },
    titleTextContainer: {
        flex: 0.8
    },
    iconContainer: {
        flex: 0.2
    },
    textsubs: {
        fontSize: RFValue(15),
        color: "white"
    },
    title: {
        color: "white",
        fontSize: 25,
        marginLeft: 25,
        marginTop: 6
    },

    descriptionContainer: {
        marginTop: RFValue(5)
    },
    descriptionText: {
        fontSize: RFValue(13),
        color: "white"
    },

    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10)
    },
    likeButtonLiked: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eb3948",
        borderRadius: RFValue(30)
    },
    likeButtonDisliked: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#eb3948",
        borderWidth: 2,
        borderRadius: RFValue(30)
    },
    likeText: {
        color: "white",
        fontSize: 25,
        marginLeft: 25,
        marginTop: 6
    },
    likeTextLight: {
        fontSize: 25,
        marginLeft: 25,
        marginTop: 6
    }
});
