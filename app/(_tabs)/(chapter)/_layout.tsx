import ChapterCreateScreen from "./ChapterCreateScreen";
import ChapterListScreen from "./ChapterListScreen";
import ChapterUpdateScreen from "./ChapterUpdateScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export default function chapter() {
    return (
        <Stack.Navigator initialRouteName='listar' screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name="listar" component={ChapterListScreen} />
                <Stack.Screen name="criar" component={ChapterCreateScreen} />
                <Stack.Screen name="atualizar" component={ChapterUpdateScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}