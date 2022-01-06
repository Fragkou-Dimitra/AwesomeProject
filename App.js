/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React,{useContext,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './src/components/drawer-navigator';
import type {Node} from 'react';
import Home from './src/containers/home';
import Tasks from './src/containers/tasksToDo';
import LoginUser from './src/containers/login';
import {TasksContextProvider} from './src/contexts/TasksContext';
import { AuthContext } from './src/contexts/loginContext';
import {AuthProvider} from './src/contexts/loginContext'
//import { TasksContext } from './src/contexts/TasksContext';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
//import { createContext } from 'react'
const MyDrawer = createDrawerNavigator();
//const TasksContext = createContext({data,setData})
//const [data,setData]= useContext(TasksContext)



const App: () => Node = () => {
// const {auth}=useContext(AuthContext)
 const userAdmin={
   email: "dimitra@gmail.com",
   password: "1234"
 }
 const [users,setUsers]=useState({name:"",email:""})
 const [error,setError]=useState("")

 const Login=user=>{
   if (user.email==userAdmin.email && user.password==userAdmin.password)
   {console.log(user)
   setUsers({
     name: user.name,
     email:user.email
   })}
  else console.log("user does not match")}
 const Logout=()=>{
   setUsers({name:"",email:""})
  console.log("Logout")}
 
 
  return (
 
    <TasksContextProvider>
    <NavigationContainer >
     
      <MyDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <MyDrawer.Screen name="LoginUser" component={LoginUser} Login={Login} error={error}/>

     <MyDrawer.Screen name="Home" component={Home}  />
      <MyDrawer.Screen name="Tasks" component={Tasks}  />
    
      
      
    </MyDrawer.Navigator>
   
    </NavigationContainer>
    
    </TasksContextProvider>
    
  );
};


export default App;
