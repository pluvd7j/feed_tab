//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import Share from "react-native-share";
import RNFS from 'react-native-fs';
import styles from '../../Css/style';
import ModalDropdown from 'react-native-modal-dropdown';


// create a component
const Home = (props) => {

    const FeedData = useSelector(state => state.addData?.dataAddedSuc);
    const [dataAdd, setDataAdd] = useState(FeedData);

    console.log("here", dataAdd)

    useEffect(() => {
        setDataAdd(FeedData)
    }, [FeedData])

    useEffect(() => {
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

    const sortByTime = (index, item) => {

        if (dataAdd.length > 0) {
            if (item == "Newest First") {
                let data = [...dataAdd];
                data.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                })
                setDataAdd(data)
            } else {
                let data = [...dataAdd];
                data.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                })
                setDataAdd(data)
            }

        }


    };



    return (
        <View style={styles.container}>
            {dataAdd.length === 0 ? (

                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>There is No Data Available</Text>
                </View>

            )
                :
                <>

                    <View style={styles.sortByContainer}>
                        <ModalDropdown options={['Newest First', 'Oldest First']} onSelect={(index, item) => sortByTime(index, item)}>
                            <Text style={styles.sortByText}>Sort By Time<FontAwesomeIcon name='filter' size={25} />  </Text>
                        </ModalDropdown>
                    </View>
                    <ScrollView style={styles.homeScroll} showsVerticalScrollIndicator={false}>
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
                                    <Image style={styles.imageHome} source={item.gallerySrc} />
                                }
                                <View style={styles.shareButtonContainer}>

                                    <TouchableOpacity style={styles.shareButton} onPress={() => share(item)} >
                                        <FontAwesomeIcon color={'#fff'} size={35} name={'share-alt-square'} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.textContainer}>
                                    <View style={styles.textSubContainer}>
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


            <TouchableOpacity style={styles.addButton}
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



//make this component available to the app
export default Home;
