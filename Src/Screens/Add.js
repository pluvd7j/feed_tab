//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { dataAddedSuccess } from '../../Redux/Action/action';
import VideoPlayer from 'react-native-video-player';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

// create a component
const AddScreen = (props) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [gallerySrc, setGallerySrc] = useState('');
    const [sourceType, setSourceType] = useState("image/jpeg");
    const [datePicker, setDatePicker] = useState(false)

    const options2 = {
        title: 'Select ',
        mediaType: 'mixed',
        path: 'mixed',
        quality: 1
    };

    const selectVideo = () => {


        launchImageLibrary(options2, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                if (response?.assets[0]?.fileSize > '10000000') {
                    alert("File Size Should not Exceed 10mb")
                    setGallerySrc("")
                } else {
                    const source = { uri: response?.assets[0]?.uri };


                    setGallerySrc(source)
                    setSourceType(response?.assets[0]?.type)
                }

            }
        });


    }

    const dateChange = (item) => {
        console.log(item);
        let changedDate = moment(item).format('DD-MMM-YYYY, h:mm a');
        setDate(changedDate)
        setDatePicker(false)
    }

    const cancel = () => {
        setTitle('');
        setDescription('');
        setDate('');
        setGallerySrc('');
        setSourceType('');

    }

    const submit = () => {
        if (!gallerySrc) {
            alert("Please select the Banner Image")
        }
        else if (!title) {
            alert("Please Enter the Title")
        }
        else if (!date) {
            alert("Please Select the Date")
        }
        else if (!description) {
            alert("Please Enter the Description")
        } else {
            let data = {
                "title": title,
                "description": description,
                "date": date,
                "gallerySrc": gallerySrc,
                "srcType": sourceType
            }
            dispatch(dataAddedSuccess(data))
            alert("Event Submitted Successfully");
            props.navigation.navigate("Home")
        }
    }
    return (
        <View >
            {sourceType == "video/mp4" ?
                <VideoPlayer
                    video={gallerySrc}
                    videoWidth={1600}
                    videoHeight={900}
                    disableControlsAutoHide
                />

                :
                <Image style={{ width: "95%", height: 200, position: "relative", borderColor: "#000", borderWidth: 0.5, alignSelf: "center" }} source={gallerySrc} />
            }
            <View style={{ position: "absolute", width: "100%" }}>

                <TouchableOpacity style={{ marginLeft: "auto", marginRight: 10 }} onPress={selectVideo}>
                    <MaterialCommunityIcon color={'darkgray'} size={35} name={'pencil-box-outline'} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirextion: "row" }}>
                <Text style={{ color: "#000", marginLeft: 5, padding: 5 }}>*Banner is must</Text>
            </View>

            <View style={{ flexDirextion: "row", padding: 10 }}>
                <Text style={{ color: "#000", marginLeft: 5, padding: 5 }}>Event Title*</Text>
                <TextInput
                    style={{ borderColor: "#000", borderWidth: 1, width: "95%", alignSelf: "center" }}
                    value={title}
                    onChangeText={(text) => setTitle(text)} />
            </View>

            <View style={{ flexDirextion: "row", padding: 10 }}>
                <Text style={{ color: "#000", marginLeft: 5, padding: 5 }}>Event Date*</Text>
                <TouchableOpacity onPress={() => setDatePicker(true)} style={{ borderColor: "#000", padding: 3, borderWidth: 1, width: "95%", alignSelf: "center", }}>
                    <View>
                        <Text style={{ color: "#000", textAlign: "center", top: 10 }}>{date}</Text>
                        <FontAwesomeIcon
                            name="calendar-o" size={25} style={{ marginLeft: "auto", bottom: 10 }}
                        />

                    </View>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={datePicker}
                    mode="datetime"
                    onConfirm={(date) => dateChange(date)}
                    onCancel={() => setDatePicker(false)}
                />

            </View>

            <View style={{ flexDirextion: "row", padding: 10 }}>
                <Text style={{ color: "#000", marginLeft: 5, padding: 5 }}>Event Description*</Text>
                <TextInput
                    style={{ borderColor: "#000", borderWidth: 1, width: "95%", alignSelf: "center" }}
                    value={description}
                    onChangeText={(text) => setDescription(text)} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", padding: 10 }}>
                <View style={{ flexDirection: "column", width: "45%" }}>
                    <TouchableOpacity onPress={cancel}
                        style={{ backgroundColor: "pink", borderColor: "yellow", borderWidth: 0.5, borderRadius: 5, padding: 8, }}>
                        <Text style={{ textAlign: "center" }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column", width: "45%" }}>
                    <TouchableOpacity onPress={submit}
                        style={{ backgroundColor: "lightblue", borderColor: "green", borderWidth: 0.5, borderRadius: 5, padding: 8, }}>
                        <Text style={{ textAlign: "center" }}>Submit/Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
export default AddScreen;
