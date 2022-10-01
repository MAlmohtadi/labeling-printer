import { createDrawerNavigator } from '@react-navigation/drawer';
import Printers from './Printers';
import Store from './Store';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="الطابعات" component={Printers} />
      <Drawer.Screen name="اعدادات المتجر" component={Store} />
    </Drawer.Navigator>
  );
}

export default connect(mapStateToProps, {})(MyDrawer);