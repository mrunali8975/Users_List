import { StyleSheet } from "react-native";
export const MainStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFEADD'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        flex: 1,
        padding:6

    },
    img: {
        width: 50,
        height: 50,
        marginHorizontal: 5
    },
    addButtonContainer:
    {
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom:20,
        right: 20,
        height: 70,
        backgroundColor: '#FF2171',
        borderRadius: 100,
    }
})