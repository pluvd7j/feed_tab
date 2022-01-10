//import liraries
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { dataAddedFailure, dataAddedSuccess } from '../../Redux/Action/action';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import Share from "react-native-share";
import RNFS from 'react-native-fs';

// create a component
const Home = (props) => {
    const dispatch = useDispatch();
    // const isFocused = useIsFocused()
    let dataAdd = useSelector(state => state.addData?.dataAddedSuc)
    console.log("here", dataAdd)


    useEffect(() => {
        // dispatch(dataAddedFailure('data'))
        requestCameraPermission()
    }, [])
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ]);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use ");
            } else {
                // console.log(" permission denied");
                requestCameraPermission()
            }
        } catch (err) {
            console.warn(err);

        }
    };



    const share = async (item) => {
        RNFS.readFile(item.gallerySrc.uri, 'base64').then(res => {
            console.log("res", res)
            if (res) {
                if (item.type == 'video/mp4') {
                    var options = {
                        title: item.title,
                        message: item.title,
                        failOnCancel: false,
                        type: item.type,
                        url: `data:video/mp4;base64,${res}`,
                    };
                    setTimeout(() => {
                        Share.open(options)
                            .then((re) => {
                                console.log(re);
                            })
                            .catch((err) => {
                                err && console.log(err);
                            });
                    }, 5000);

                } else {
                    var options = {
                        title: item.title,
                        message: item.title,
                        failOnCancel: false,
                        type: item.type,
                        urls: [item.gallerySrc.uri],
                    };
                    Share.open(options)
                        .then((re) => {
                            console.log(re);
                        })
                        .catch((err) => {
                            err && console.log(err);
                        });
                }

            }
        })
            .catch(err => {
                console.log(err)
            });
    }



    return (
        <View style={{ flexDirection: "column", backgroundColor: "#fff", height: "100%" }}>
            {dataAdd.length === 0 ? (

                <View style={{ height: '90%', width: "100%" }}>
                    <Text style={{ textAlign: "center", marginTop: "auto", marginBottom: "auto" }}>There is No Data Available</Text>
                </View>

            )
                :
                <>

                    <ScrollView style={{ height: '90%', width: "95%", alignSelf: "center" }} showsVerticalScrollIndicator={false}>
                        {dataAdd && dataAdd.map(item => (
                            <View style={{ padding: 3 }} key={new Date(item?.date).toString()} >

                                {item.srcType == "video/mp4" ?
                                    <VideoPlayer
                                        video={item.gallerySrc}
                                        videoWidth={1600}
                                        videoHeight={900}
                                        disableControlsAutoHide
                                    />

                                    :
                                    <Image style={{ width: "100%", height: 200 }} source={item.gallerySrc} />
                                }
                                <View style={{ position: "absolute", width: "100%" }}>

                                    <TouchableOpacity style={{ marginLeft: "auto", top: 5 }} onPress={() => share(item)} >
                                        <FontAwesomeIcon color={'#fff'} size={35} name={'share-alt-square'} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ borderColor: "black", borderWidth: 1, width: "100%", padding: 8 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                        <View style={{ flexDirection: "column" }}>
                                            <Text style={{ color: "#000" }}>Title: {item.title}</Text>
                                        </View>
                                        <View style={{ flexDirection: "column" }}>
                                            <Text style={{ color: "#000" }}>Date: {item.date}</Text>

                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: "#000" }}>Description: {item.description}</Text>
                                    </View>
                                </View>



                            </View>
                        ))}
                    </ScrollView>
                </>
            }


            <TouchableOpacity style={{ flexDirection: "row", marginLeft: "auto", marginRight: 'auto', padding: 8 }}
                onPress={() => props.navigation.navigate('Add')}>
                <Feather
                    name="plus-circle"
                    color="#000"
                    size={30}
                    style={{ backgroundColor: 'transparent' }}
                />
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default Home;
