/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React,  { useEffect, useState } from 'react';
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
  TouchableOpacity,
  Linking,
  TouchableRipple,
  Switch
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const SectionNews = ({children, title, subtitle}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {color: "red",},]}>
        {title}
      </Text>
      <Text >{subtitle}</Text>
      <Text style={[ styles.sectionDescription, {color: isDarkMode ? Colors.light : Colors.dark, },]}>
        {children}
      </Text>
    </View>
  );
};

 

const Home: () => Node = ({navigation}) => {
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
          <Text style={{alignContent:'center',fontWeight:"300", fontSize:30, marginTop:30, padding:10}}>News</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1}}/>       
          <SectionNews title="Why broken African phones are shipped to Europe" subtitle="Eric Arthur does not have much time for hobbies - he spends most weekends driving all over Ghana collecting broken mobile phones.">
           <Text> 
             <View style={{width:300, flex:1, flexDirection:'row'}}>
               <Image style={{ height:100, width:100,marginRight:10}} source={{uri:'https://ichef.bbci.co.uk/news/976/cpsprodpb/109E3/production/_121476086_whatsappimage2021-11-08at10.55.43.jpg'}}/>
               <Text style={{ flexShrink: 1 }}> From his home in Cape Coast he can rove more than 100 miles (160km) in one weekend visiting repair shops and scraps yards - anywhere that has a decent supply of broken devices. In a good weekend he can collect 400 of them. On top of that, he manages a team of six agents doing the same thing in other parts of the country, and between them they expect to collect around 30,000 phones this year.
                  <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL('https://www.bbc.com/news/business-59161682')}>
                    continue reading...
                  </Text>
               </Text>  
             </View>
           </Text> 
          </SectionNews>
          <SectionNews title="Myanmar coup: The women abused and tortured in detention" subtitle="Women in Myanmar have been tortured, sexually harassed and threatened with rape in custody, according to accounts obtained by the BBC.">
           <Text> 
             <View style={{width:300, flex:1, flexDirection:'row'}}>
               <Image style={{ height:100, width:100,marginRight:10}} source={{uri:'https://ichef.bbci.co.uk/news/976/cpsprodpb/9908/production/_121867193_image005.jpg'}}/>
               <Text style={{ flexShrink: 1 }}> Five women who were detained for protesting against a military coup in the country earlier this year say they were abused and tortured in the detention system after their arrests.
                  Their names have been changed in the following accounts to protect their safety.<Text style={{fontWeight:"bold"}}> Warning: this piece contains disturbing descriptions of abuse. </Text>Since Myanmar's military seized power in February, protests have swept across the country - and women have played a prominent role in the resistance movement. 
                  <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL('https://www.bbc.com/news/world-asia-59462503')}>
                    continue reading...
                  </Text>
               </Text>  
             </View>
           </Text> 
          </SectionNews>
          <Footer/>
        </View>
      </ScrollView>
    </SafeAreaView>
    
  );
};

const Footer:()=>Node=()=>{
  return(
    <ScrollView style = {{backgroundColor:'black', marginTop:40, padding:20}}>
          <View style={{flex:1, flexDirection:"row", justifyContent:"space-around"}}>
            <View>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')}> 
                  <Icon name="facebook" size={40} color='#3B5998'/>
                </TouchableOpacity ></View>
                <View>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.twitter.com')}> 
                  <Icon name="twitter" size={40} color='#00ACEE'/>
                </TouchableOpacity ></View>
                <View>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com')}> 
                  <Icon name="linkedin" size={40} color='#0E76A8'/>
                </TouchableOpacity ></View>
          </View>
      </ScrollView>
  )
}

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
    <ScrollView>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={[styles.sectionContainer, styles.sectionTitle]}>Task-list</Text>
      <QueryClientProvider client={queryClient}>
        <ToDoList />
      </QueryClientProvider>
    </View>
  <Footer/></ScrollView>
  );
}



const ToDoList:()=>Node=()=> {
  const [data,setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [statusIndicator1,setStatus]=useState('not done');
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
 // useEffect(() => { statusIndicator1 = 'done';  });

  return (
    <View style={styles.listContainer}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList style={styles.flatListContainer}
            data={data}
            keyExtractor={({ id }, status) => {id}}            
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={styles.row_cell_title}><Text style={styles.row_title}>{item.title}{' : '}</Text></View>          
                <View style={styles.row_cell_status}>{item.status=='done'?
                ( 
                  <View><Icon name="check" size={40} color='black' />
                
                </View>):
                (<View >  
                  <View><Icon name="star" size={40} color='red'/>
                  <TouchableOpacity onPress={() => setStatus(statusIndicator1) }> 
                    <Text style = {styles.doneButton}>done</Text>
                </TouchableOpacity ></View>
                </View>)}
                </View> 
              </View>
            )}
          />
        )}
      </View>
  )
  }

const DrawerContent=(props):Node=> {
  
  return(
      <View style={{flex:1, backgroundColor:'black'}}>
          <DrawerContentScrollView {...props} >
              <View style={styles.drawerContent}>                
                      <DrawerItem  //{...props} activeTintColor='blue' activeBackgroundColor='rgba(250, 250, 250, .04)'
                          icon={({color, size}) => (<Icon name="home-outline" color={color} size={size}/>)}
                          label="Home"
                          onPress={() => {props.navigation.navigate('Home')}}
                          contentOptions= {{
                            activeTintColor: 'red',
                            activeBackgroundColor:'rgba(250, 250, 250, .04)',
                            itemsContainerStyle: {
                              marginVertical: 0,
                            }}
                            
                          }
                      />
                      <DrawerItem 
                          icon={({color, size}) => (<Icon name="calendar" color={color} size={size}/>)}
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
      <MyDrawer.Screen name="Home" component={Home} />
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
    backgroundColor:'white',
   

  },
   
  listContainer: {
    flex: 1,
    padding: 8,
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: 'black',
    width:400
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
    fontSize: 20
  },
  row_cell_status: {
    color: 'white',
    padding: 16,
    flex: 0,
    fontSize: 15,
    
  },
  row_cell_title: {
    flex: 1
  },
  doneButton:{
    textAlign:'center',
    borderRadius: 3,
    backgroundColor: 'black',
    color: 'white',
    fontSize:10
  }
  
});

export default App;
