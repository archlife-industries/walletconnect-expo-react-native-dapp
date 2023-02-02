import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginSVG from '../assets/images/misc/login.svg';
import AppleSVG from '../assets/images/misc/apple.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import CoinbaseSVG from '../assets/images/misc/coinbase.svg';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useDispatch, useSelector } from 'react-redux';
import { setWallet } from '../context/store/wallet'
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { AppContext } from '../context/AppProvider';
import { fonts, responsiveHeight, responsiveWidth } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';


const LoginScreen = (props: { navigation: any }) => {
  const { currentWalletAddress, setCurrentWalletAddress } = useContext(AppContext);
  const [address, setAddress] = useState<string>("");
  const connector = useWalletConnect();
  const dispatch = useDispatch();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector])

  const disconnectWallet = React.useCallback(() => {
    setAddress("");
    connector.killSession();
    return address
  }, [connector])

  useEffect(() => {
    console.log('Wallet Entry is: ', address);
    if (connector.connected && address.length < 40) {
      setAddress(connector.accounts[0])
    }
  }, [connector, address])

  const Login = () => {
    console.log('Address was: ', address)
    if (address.length > 40) {
      console.log(`Wallet Entry ${address} was valid, call or create user in DB: `);
      dispatch(setWallet(address))
      setCurrentWalletAddress(address)
    } else {
      Alert.alert('Invalid Wallet Address', `Please enter a longer wallet address.`)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#1c1c1c' }}>
      <Image
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', resizeMode: 'cover' }}
        source={require('../assets/images/marriage-dao-love-blockchain.jpg')}
      />
      <View style={{ alignItems: 'center', position: 'absolute', top: responsiveHeight(12), alignSelf: 'center' }}>
        {/* <LoginSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: '-5deg' }] }}
          /> */}
        <Text style={{ fontSize: 36, fontWeight: 'bold', color: 'white', textAlign: 'center', fontFamily: fonts.bold }}>{'Marriage DAO 💍'}</Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF99', textAlign: 'center', marginVertical: 5, fontFamily: fonts.bold }}>{'Consumate Your Marriage on the Blockchain'}</Text>
      </View>
      <LinearGradient
        colors={['#1c1c1c99', '#1c1c1c']}
        style={{ paddingHorizontal: 25, marginHorizontal: 25, borderRadius: responsiveWidth(5) }}
      >
        <View style={{}}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: 24,
              color: '#ffffff99',
              marginVertical: 30,
            }}>
            {'Login'}
          </Text>
          <InputField
            label={'Wallet Address'}
            icon={<Ionicons
              name="wallet"
              size={20}
              color="#ffffff99"
              style={{ marginRight: 5 }} />
            }
            value={address}
            onChangeText={(value: string) => setAddress(value)}
            inputType="wallet"
            fieldButtonLabel={connector.connected ? "Disconnect" : "Wallet Connect"}
            fieldButtonFunction={connector.connected ? disconnectWallet : connectWallet}
            keyboardType={undefined}
          />
          <CustomButton label={"Login"} onPress={() => { Login() }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 4,
            }}>
            <TouchableOpacity onPress={() => { }}>
              <Text style={{ color: '#ffffff99', fontFamily: fonts.bold }}> Brought to you by DAO House</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
            }}>
            <TouchableOpacity onPress={() => { }}>
              <Text style={{ color: '#ff69b4', fontFamily: fonts.bold }}> Miami Hack Week 2023 🌴</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;
