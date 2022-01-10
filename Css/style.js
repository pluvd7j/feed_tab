import { StyleSheet } from "react-native";

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#fff",
        height: "100%"
    },
    noDataContainer: {
        height: '90%',
        width: "100%"
    },
    noDataText: {
        textAlign: "center",
        marginTop: "auto",
        marginBottom: "auto"
    },
    sortByContainer: {
        flexDirection: "row",
        marginLeft: "auto",
        right: 15
    },
    sortByText: {
        color: "#000",
        left: 5
    },
    homeScroll: {
        height: '90%',
        width: "95%",
        alignSelf: "center"
    },
    imageHome: {
        width: "100%",
        height: 200
    },
    shareButtonContainer: {
        position: "absolute",
        width: "100%"
    },
    shareButton: {
        marginLeft: "auto",
        top: 5
    },
    textContainer: {
        borderColor: "#000",
        borderWidth: 1,
        width: "100%",
        padding: 8
    },
    textSubContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    addButton: {
        flexDirection: "row",
        marginLeft: "auto",
        marginRight: 'auto',
        padding: 8
    },
    image: {
        width: "95%",
        height: 200,
        position: "relative",
        borderColor: "#000",
        borderWidth: 0.5,
        alignSelf: "center"
    },
    addButtonContainer: {
        position: "absolute",
        width: "100%"
    },
    addPencilButton: {
        marginLeft: "auto",
        marginRight: 10
    },
    titleContainer: {
        flexDirextion: "row",
        padding: 10
    },
    title: {
        color: "#000",
        marginLeft: 5,
        padding: 5
    },
    eventTitle: {
        borderColor: "#000",
        borderWidth: 1,
        width: "95%",
        alignSelf: "center"
    },
    dateContainer: {
        borderColor: "#000",
        padding: 3,
        borderWidth: 1,
        width: "95%",
        alignSelf: "center"
    },
    dateText: {
        color: "#000",
        textAlign: "center",
        top: 10
    },
    dateIcon: {
        marginLeft: "auto",
        bottom: 10
    },
    submitButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        padding: 10
    },
    submitButtonSubContainer: {
        flexDirection: "column",
        width: "45%"
    },
    cancelButton: {
        backgroundColor: "pink",
        borderColor: "yellow",
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 8,
    },
    submitButton: {
        backgroundColor: "lightblue",
        borderColor: "green",
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 8,
    }
});


export default styles;