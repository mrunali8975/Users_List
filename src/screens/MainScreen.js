import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import CustomButton from '../components/CustomButton';
import {MainStyle} from '../styles/MainStyle';
import {UserContext} from '../../context/Context';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MainScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const {name, userDetails, RemoveData,users} = useContext(UserContext);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
    });
    console.log(userDetails)
    return unsubscribe;
  }, [navigation,userDetails]);

  return (
    <View style={MainStyle.container}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 29,
          color: 'black',
          textAlign: 'center',
          marginTop: 20,
          marginBottom: 10,
        }}>
        List of User
      </Text>
      <View
        style={{
          height: 5,
          borderBottomWidth: 2,
          borderBottomColor: 'red',
          marginHorizontal: 10,
        }}
      />
      <FlatList
        data={userDetails}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Add', {type: 'update',item:item})}>
            <View style={MainStyle.itemContainer}>
              <Image source={{uri: item.photos}} style={MainStyle.img} />
              <View style={{marginHorizontal: 8,alignItems:'flex-start',justifyContent:'center',flex:0.8}}>
                <Text style={{color:'black',}}>Name : {item.first_name + ' ' + item.last_name}</Text>
                <Text>DOB: {item.dob}</Text>
                <Text>Married: {item.married}</Text>
              </View>
              <View
                style={{
                  alignSelf:'center',justifyContent:'flex-end',
                  marginLeft: 55,
                }}>
                <CustomButton
                  title={'Delete'}
                  onPressed={() => RemoveData(item.first_name)}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={MainStyle.addButtonContainer}
        onPress={() => navigation.navigate('Add', {type: 'add'})}>
        <Ionicons name="add-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};
export default MainScreen;
