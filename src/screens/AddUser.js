import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import CustomInput from '../components/CustomInput';
// import CheckBox from '@react-native-community/checkbox';
import {CheckBox} from '@rneui/themed';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../components/CustomButton';
import { UserContext } from '../../context/Context';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const AddUser = ({route, navigation}) => {
  const {type} = route?.params;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [userImage, setUserImage] = useState({});
  const {AddData, userDetails,Update,users} = useContext(UserContext);
  const [nameError, setNameError] = useState('');
  const [lastError, setLastError] = useState('');
  const [dateError, setDateError] = useState('');
  const [imageError, setImageError] = useState('');
  const [selected,setSelected]=useState('')

  const onChange = (event, selectedDate) => {
    setOpen(true);
  
  };
  const AddButton = () => {
    let dt = new Date();
    if (firstname.trim()) {
      if (lastname.trim()) {
        if (
          date.toLocaleDateString().toString() !==
          dt.toLocaleDateString().toString()
        ) {
          if (userImage.uri) {
            setDateError('');
            const data = {
              id: userDetails.length + 1,
              first_name: firstname,
              last_name: lastname,
              dob: date.toLocaleDateString().toString(),
              married: checked ? 'YES' : 'NO',
              photos: userImage.uri,
            };
            setNameError('');
            setLastError('');
            setDateError('');
            AddData(data);
            navigation.pop();
          } else {
            setDateError('');
            setImageError('Please Add your Profile photo');
          }
        } else {
          setNameError('');
          setLastError('');
          setDateError('Please Enter Your  DOB');
        }
      } else {
        setNameError('');
        setLastError('Please Enter Last Name');
      }
    } else {
      setNameError('Please Enter First Name');
      console.log('enter');
    }
  };
  const ChooseAvatarCamera = () => {
    let options = {
      quality: 1,
    };

    launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      // setModalVisible(!modalVisible);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = {uri: response.assets[0].uri};
        console.log(JSON.stringify(response.assets[0]));
        setUserImage({uri: source.uri});
        setImageError('');
      }
    });
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response);
    });
  };
  if (type === 'add') {
    return (
      <View style={{flex: 1, backgroundColor: '#FFEADD', padding: 10}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 29,
            color: 'black',
            textAlign: 'center',
            marginBottom: 10,
          }}>
          Add User
        </Text>
        <View>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={ChooseAvatarCamera}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                height: 70,
                width: 70,
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 50,
              }}>
              {userImage.uri ? (
                <Image
                  source={{uri: userImage.uri}}
                  style={{height: 70, width: 70}}
                />
              ) : (
                <Text style={{textAlign: 'center', fontSize: 12}}>
                  Add Profile photos
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{color: 'black'}}>
          Enter first name <Text style={{color: 'red'}}>*</Text>
        </Text>
        <CustomInput
          placeholder={'Enter first name'}
          onChangeText={setFirstName}
        />
        {nameError !== '' ? (
          <Text style={{color: 'red'}}>{nameError}</Text>
        ) : null}

        <Text style={{color: 'black'}}>
          Enter last name <Text style={{color: 'red'}}>*</Text>
        </Text>
        <CustomInput
          placeholder={'Enter Last name'}
          onChangeText={setLastName}
        />
        {lastError !== '' ? (
          <Text style={{color: 'red'}}>{lastError}</Text>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 5,
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Text style={{color: 'black'}}>
              Married <Text style={{color: 'red'}}>*</Text>
            </Text>
            <CheckBox
              checked={checked}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={'checkbox-blank-outline'}
              containerStyle={{
                backgroundColor: '#FFEADD',
              }}
              checkedColor="red"
              uncheckedColor="black"
            />
          </View>
          <Text style={{marginRight: 10, color: 'black'}}>
            Select DOB <Text style={{color: 'red'}}>*</Text>
          </Text>
          <DatePicker
            modal
            mode="date"
            title={'Select DOB'}
            maximumDate={new Date('2018-12-31')}
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setDateError('');
              setSelected(date.toLocaleDateString().toString())
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
 <Text>{selected} </Text>
  <Ionicons name={'calendar'} size={20} color={'red'} onPress={onChange} />
          {/* <Pressable
            onPress={onChange}
            style={{
              borderWidth: 1,
              borderRadius: 18,
              borderColor: 'black',
              width: '50%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            {open ? (
              <Text>Select DOB</Text>
            ) : (
              <Text>{date.toLocaleDateString()}</Text>
            )}
          </Pressable> */}
        </View>
        {dateError !== '' ? (
          <Text style={{color: 'red'}}>{dateError}</Text>
        ) : null}
        {imageError !== '' ? (
          <Text style={{color: 'red'}}>{imageError}</Text>
        ) : null}
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <CustomButton title={'Add'} onPressed={AddButton} />
        </View>
      </View>
    );
  }
  else {
  const { item } = route?.params;
  const [checked, setChecked] = React.useState(item.married ==='YES'? true:false);
  const toggleCheckbox = () => setChecked(!checked);
  const [firstname, setFirstName] = useState(item.first_name);
    const [lastname, setLastName] = useState(item.last_name);
    const [selected,setSelected]=useState(item.dob)

    const [date, setDate] = useState(new Date());
    const [userImage, setUserImage] = useState({ uri: item.photos });
    const UpdateData = (id) => {  
      Update(id, firstname,
        lastname,
        userImage.uri,
        checked ? 'YES':'NO',
       selected)
      navigation.pop();
    }
    const ChooseAvatarCamera = () => {
      let options = {
        quality: 1,
      };
  
      launchImageLibrary(options, response => {
        // console.log('Response = ', response);
        // setModalVisible(!modalVisible);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          let source = {uri: response.assets[0].uri};
          console.log(JSON.stringify(response.assets[0]));
          setUserImage({uri: source.uri});
          setImageError('');
        }
      });
    };
  
    return (
      <View style={{flex: 1, backgroundColor: '#FFEADD', padding: 10}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 29,
            color: 'black',
            textAlign: 'center',
            marginBottom: 10,
          }}>
          Update User
        </Text>
        <View>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={ChooseAvatarCamera}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                height: 70,
                width: 70,
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 50,
              }}>
              {item.photos ? (
                <Image
                  source={{uri: userImage.uri}}
                  style={{height: 70, width: 70}}
                />
              ) : (
                <Text style={{textAlign: 'center', fontSize: 12}}>
                  Add Profile photos
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{color: 'black'}}>
          Enter first name <Text style={{color: 'red'}}>*</Text>
        </Text>
        <CustomInput
          value={firstname}
          placeholder={'Enter first name'}
          onChangeText={setFirstName}
        />
        {nameError !== '' ? (
          <Text style={{color: 'red'}}>{nameError}</Text>
        ) : null}

        <Text style={{color: 'black'}}>
          Enter last name <Text style={{color: 'red'}}>*</Text>
        </Text>
        <CustomInput
          placeholder={'Enter Last name'}
          onChangeText={setLastName}
          value={lastname}
        />
        {lastError !== '' ? (
          <Text style={{color: 'red'}}>{lastError}</Text>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 5,
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Text style={{color: 'black'}}>
              Married <Text style={{color: 'red'}}>*</Text>
            </Text>
            <CheckBox
              checked={checked}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={'checkbox-blank-outline'}
              containerStyle={{
                backgroundColor: '#FFEADD',
              }}
              checkedColor="red"
              uncheckedColor="black"
            />
          </View>
          <Text style={{marginRight: 10, color: 'black'}}>
            Select DOB <Text style={{color: 'red'}}>*</Text>
          </Text>
          <DatePicker
            modal
            mode="date"
            title={'Select DOB'}
            maximumDate={new Date('2018-12-31')}
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setDateError('');
              setSelected(date.toLocaleDateString().toString())
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Text>{selected} </Text>
  <Ionicons name={'calendar'} size={20} color={'red'} onPress={onChange} />
          {/* <Pressable
            onPress={onChange}
            style={{
              borderWidth: 1,
              borderRadius: 18,
              borderColor: 'black',
              width: '50%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            
              <Text>Select DOB</Text>
            
          </Pressable> */}
        </View>
        {dateError !== '' ? (
          <Text style={{color: 'red'}}>{dateError}</Text>
        ) : null}
        {imageError !== '' ? (
          <Text style={{color: 'red'}}>{imageError}</Text>
        ) : null}
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <CustomButton title={'Update'} onPressed={()=>UpdateData(item.id)} />
        </View>
      </View>
    );
  }
};

export default AddUser;
