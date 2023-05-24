import { Drawer } from 'expo-router/drawer'
import { AuthContext } from '../contexts/AuthContext'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsThin: require('../assets/fonts/Poppins-Thin.ttf')
  })

  if (!fontsLoaded) {
    return undefined
  }
  //3b700ecc-cec9-4be4-8c00-48bced543861
  return (
    <AuthContext.Provider value="3b700ecc-cec9-4be4-8c00-48bced543861">
      <StatusBar style="auto" />
      <Drawer screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="(_tabs)" options={{ drawerLabel: 'Home' }} />
        <Drawer.Screen name="Forum" options={{ drawerLabel: 'Fórum' }} />
        <Drawer.Screen name="Configuracoes" options={{ drawerLabel: 'Configurações' }} />
      </Drawer>
    </AuthContext.Provider>
  )
}
export default RootLayout