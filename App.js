import { View,} from 'react-native'
import React from 'react'
import RootNavigation from './src/navigation/RootNavigations'
import { UserProvider,UserContext } from './context/Context'

const App = () => {
  return (
    <UserProvider>
 <View style={{flex:1,backgroundColor:'#FFEADD'}}>
     <RootNavigation/>
    </View>
    </UserProvider>
   
  )
}

export default App