/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React,  {  useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type {Node} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {color: "red",},]}>
        {title}
      </Text>
      <Text style={[ styles.sectionDescription, {color: isDarkMode ? Colors.light : Colors.dark, },]}>
        {children}
      </Text>
    </View>
  );
};

 

const HomeScreen: () => Node = ({navigation}) => {
  const queryClient = new QueryClient();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
         <View style={styles.MyHeader}>
            <Image style={{ height:200, width:200}} source={require('./images/programming_icon.png') }/>
            <QueryClientProvider client={queryClient}>
        <User />
      </QueryClientProvider>
          </View> 
        <View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white }}>           
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
          <Button onPress={() => navigation.navigate('My Tasks')} title="My Tasks"/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const User:()=>Node=()=> {
  const { isLoading, error, data } = useQuery('name', () =>
    fetch('https://my-json-server.typicode.com/Fragkou-Dimitra/demo/profile').then(res =>
      res.json() 
    )
  )
  if (isLoading) return <Text>'Loading...'</Text> 
  if (error) return <Text>'An error has occurred: '  {error.message}</Text>
  return (
    
    <View>    
      <Text h1>{data.name}{' '}</Text>
      <Text style={{color:'blue'}}>{data.email}{' '}</Text>
    </View>
  )
}

const Tasks:()=>Node=({navigation})=> {
  const queryClient = new QueryClient();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={[styles.sectionContainer, styles.sectionTitle]}>Task-list</Text>
      <QueryClientProvider client={queryClient}>
        <ToDoList />
      </QueryClientProvider>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}



const ToDoList:()=>Node=()=> {
  const [data,setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useQuery('id' , async () => {
    try {
     const response = await fetch('https://my-json-server.typicode.com/Fragkou-Dimitra/demo/db');
     const json = await response.json();
     
     setData(json.tasks);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }
  );
 
  return (
    <View style={styles.listContainer}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList style={styles.flatListContainer}
            data={data}
            keyExtractor={({ id }, index) => id}            
            renderItem={({ item }) => (
              
              <View style={styles.row}>
                <View style={styles.row_cell_title}><Text style={styles.row_title}>{item.title}{' : '}</Text></View>
                <Text style={styles.row_cell_status}>{item.status}</Text> 
              </View>
            )}
          />
        )}
      </View>
  )
}


const DrawerContent=(props):Node=> {
  
  return(
      <View style={{flex:1}}>
          <DrawerContentScrollView {...props}>
              <View style={styles.drawerContent}>                
                      <DrawerItem 
                          icon={({color, size}) => (
                              <Icon 
                              name="home-outline" 
                              color={color}
                              size={size}
                              />
                          )}
                          label="Home"
                          onPress={() => {props.navigation.navigate('HomeScreen')}}
                      />
                      <DrawerItem 
                          icon={({color, size}) => (
                              <Icon 
                              name="calendar" 
                              color={color}
                              size={size}
                              />
                          )}
                          label="My Tasks"
                          onPress={() => {props.navigation.navigate('Tasks')}}
                      />                
              </View>
          </DrawerContentScrollView>
      </View>
  );
}


const MyDrawer = createDrawerNavigator();


const App:()=>Node=()=> {
  return (
    <NavigationContainer>
      <MyDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <MyDrawer.Screen name="HomeScreen" component={HomeScreen} />
      <MyDrawer.Screen name="Tasks" component={Tasks} />
    </MyDrawer.Navigator>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  MyHeader: {
    display:"flex",
    flexDirection: "row",
    alignItems: "center",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  drawerContent: {
    flex: 1,
  },
   
  listContainer: {
    flex: 1,
    padding: 8,
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: 'black',
    width:300
  },
  flatListContainer: {
    marginTop: 14,
    alignSelf: "stretch",
  },
  row: {
    borderRadius: 2,
    flex: 1,
    backgroundColor:'grey',
    flexDirection: "row", 
    justifyContent: "flex-start", 
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 6
  },
  row_title: {
    color: 'white',
    textAlignVertical: "top",
    includeFontPadding: false,
    flex: 0,
    fontSize: 20,
  },
  row_cell_status: {
    color: 'white',
    paddingLeft: 16,
    flex: 0,
    fontSize: 15
  },
  row_cell_title: {
    flex: 1
  },
  
});

export default App;
