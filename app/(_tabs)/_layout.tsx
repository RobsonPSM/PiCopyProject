import { Tabs, useNavigation, useRouter } from 'expo-router'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'
import Icons from '@expo/vector-icons/MaterialIcons'
import { Text, TouchableOpacity, Image, ImageBackground, View } from 'react-native'
import { API } from '../../http/API'
import { Usuario } from '../../models/Usuario'
import { useContext, useEffect, useState } from 'react';
import { BlurView } from 'expo-blur';
import { AuthContext } from '../../contexts/AuthContext'
import SearchBar from '../../components/SearchBar'
import Constants from 'expo-constants'
import { getUsuarioByUsuarioId } from '../../core/services/UsuarioService'

const MenuInferior = () => {
  const router = useRouter();
  const nav = useNavigation();
  const idUsuario = useContext(AuthContext)
  const headerHeight = Constants.statusBarHeight * 1.5
  const { usuario } = getUsuarioByUsuarioId(idUsuario)

  return (

    <Tabs

      initialRouteName="(dashboard)"
      screenOptions={{
        //   tabBarStyle: {
        //     position: 'absolute',
        //   },
        //   tabBarBackground: () => (
        //     <BlurView tint="light" intensity={90} style={{flex: 1,justifyContent: 'center'}}/>
        //   ),
        //   // tabBarItemStyle: {
        //   //   flex: 1,
        //   //   justifyContent: 'center',
        //   //   alignItems: 'center'
        //   // },
        tabBarShowLabel: false,
        //   tabBarLabelStyle: {fontSize: 11},
        //   tabBarInactiveTintColor: '#828282',
        //   tabBarActiveTintColor:'#F47402',
        //   headerStatusBarHeight: headerHeight,
        //   headerTitleAlign: 'center',
        headerTitleContainerStyle: { paddingBottom: 15 },
        headerTitle: () => (
          <>
            {usuario && <View>
              <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '600' }}>Olá, {usuario.nomeCompleto} 👋</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                <Icons name='attach-money' size={15} color={'orange'} />
                <Text style={{ fontSize: 13 }}>{/*{usuario.senacCoin.saldo}*/}1500</Text>
              </View>
            </View>}
          </>

        ),
        headerRightContainerStyle: { paddingRight: 15, paddingBottom: 15 },
        headerRight: () => (
          <TouchableOpacity style={{ width: 50, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50, borderColor: 'lightgray', borderWidth: 1 }}>
            <Icons name='notifications' size={24} color={'black'} />

            {/* <Feather
                onPress={() => router.push('/Mensagens')}
                name='message-square'
                size={35}
                color="black"
                borderRadius={50}
              /> */}
          </TouchableOpacity>

        ),
        headerLeftContainerStyle: { paddingLeft: 15, paddingBottom: 15 },
        headerLeft: () => (
          <TouchableOpacity onPress={() => nav.openDrawer()}>
            {usuario && <Image
              alt='profilePic'
              style={{ width: 50, aspectRatio: 1, borderRadius: 50, borderWidth: 1, borderColor: 'gray' }}
              source={{ uri: `data:image/png;base64,${usuario.foto}` }}
            />}

          </TouchableOpacity>
        )
      }}
    >
      <Tabs.Screen
        name="(chapter)"
        options={{
          //tabBarLabel: 'Chapter',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="calendar-today" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="(dashboard)"
        options={{
          //tabBarLabel: 'Home',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="Calendario"
        options={{
          //tabBarLabel: 'Calendario',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="calendar-today" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="Badges"
        options={{
          //tabBarLabel: 'Badges',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-trophy" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="Arquivos"
        options={{
          //tabBarLabel: 'Arquivos',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="folder" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="Notificacoes"
        options={{
          href: null,
          tabBarBadge: 3,
          //tabBarLabel: 'Notificações',

          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="notifications" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="Mensagens"
        options={{
          href: null
        }}
      />
    </Tabs>
  )
}

export default MenuInferior
