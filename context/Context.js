import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState} from 'react';
const UserContext = createContext();
function UserProvider({children}) {
  const [userDetails, setUserDetails] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('mrunali');
    const AddData = data => {
        console.log('data added')
        console.log(userDetails)
        setUserDetails([...userDetails,data])

  };
  const RemoveData = id => {
    console.log('dl', id);
      setUserDetails(userDetails.filter(user => user.first_name !== id));
    };
    const Update = (id,fname,lname,pic,married,date) =>
    {
        console.log(userDetails)
        objIndex = userDetails.findIndex((obj => obj.id == id));
        userDetails[objIndex].first_name = fname;
        userDetails[objIndex].last_name = lname;
        userDetails[objIndex].photos = pic;
        userDetails[objIndex].married = married;
        userDetails[objIndex].dob = date;
        userDetails[objIndex].id = id;
        setUserDetails([userDetails[objIndex]])
        console.log(userDetails)
     }
  return (
    <UserContext.Provider
      value={{userDetails, AddData, name, users, RemoveData,Update}}>
      {children}
    </UserContext.Provider>
  );
}
export {UserProvider, UserContext};
