import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { RootState } from '../context/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../context/AppProvider';
import { Ionicons } from '@expo/vector-icons';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { setWallet } from '../context/store/wallet';
import { fonts, nullProfileImageLink, responsiveFontSize, responsiveHeight, responsiveWidth } from '../theme';
import { TabsView } from '../components/@archlife/tabs-view/tabs-view';
import { TextInputter } from '../components/@archlife/text-inputter/text-inputter';
import { Headliner } from '../components/headliner/headliner';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation }) {
  const wallet = useSelector((state: RootState) => {
    // console.log("Wallet —> ", state)
    return state.wallet.walletAddress
  });
  const { setCurrentWalletAddress } = useContext(AppContext)
  const connector = useWalletConnect();
  const dispatch = useDispatch();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('create')
  const [currentCreateIndex, setCurrentCreateIndex] = useState(0)
  const [contractDetails, setContractDetails] = useState({
    spouseOneName: '',
    spouseTwoName: '',
    numberOfYearsUntil5050: '',
    vestingPeriods: [
      {
        year: '1',
        percentage: '0'
      }
    ],
  })

  const logout = () => {
    if (connector.connected) {
      connector.killSession();
    }
    setCurrentWalletAddress("")
    dispatch(setWallet(""))
  }

  const onPressAddAnotherYear = () => {
    setContractDetails({
      ...contractDetails,
      numberOfYearsUntil5050: `${parseInt(contractDetails.numberOfYearsUntil5050) + 1}`,
      vestingPeriods: [...contractDetails.vestingPeriods, {
        year: contractDetails.vestingPeriods.length + 1,
        percentage: 0
      }]
    })
  }

  const onPressTrashCan = (indexToDelete: number) => {
    setContractDetails({
      ...contractDetails,
      numberOfYearsUntil5050: `${parseInt(contractDetails.numberOfYearsUntil5050) - 1}`,
      vestingPeriods: contractDetails?.vestingPeriods.filter((period: any, periodIndex: number) => periodIndex !== indexToDelete)
    })
  }

  useEffect(() => {
    if (contractDetails.numberOfYearsUntil5050) {
      // Update the vesting periods based on the number of years until 50/50
      // Each percentage should increase every year until equal to 1
      const vestingPeriods = []
      const numYears = parseInt(contractDetails.numberOfYearsUntil5050)
      for (let i = 1; i <= numYears; i++) {
        vestingPeriods.push({
          year: `${i}`,
          percentage: `${i / numYears}`
        })
      }
      setContractDetails({
        ...contractDetails,
        vestingPeriods
      })
    }
  }, [contractDetails.numberOfYearsUntil5050])

  const onPressGetMarriedAgain = () => {
    setCurrentCreateIndex(0)
    setContractDetails({
      spouseOneName: '',
      spouseTwoName: '',
      numberOfYearsUntil5050: '',
      vestingPeriods: [],
    })
  }
  const onPressViewCompletedContract = () => {
    onPressGetMarriedAgain()
    setActiveTab('history')
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1c' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 20,
            right: responsiveWidth(5),
            marginTop: responsiveHeight(1)
          }}
        >
          <TouchableOpacity onPress={() => setIsLogoutModalOpen(!isLogoutModalOpen)}>
            {wallet ?
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontFamily: fonts.italic, color: 'white', right: responsiveWidth(3) }}>
                  {`${wallet?.slice(0, 6)}...${wallet.slice(wallet?.length - 4, wallet?.length)}`}
                </Text>
                <ImageBackground
                  source={{ uri: nullProfileImageLink }}
                  style={{ width: 35, height: 35 }}
                  imageStyle={{ borderRadius: 25 }}
                />
              </View>
              : null
            }
          </TouchableOpacity>
        </View>
        <>
          {currentCreateIndex > 0 && currentCreateIndex !== 2 ?
            <TouchableOpacity onPress={() => setCurrentCreateIndex(currentCreateIndex - 1)}>
              <Headliner
                text={'← Back'}
                textStyle={{ fontSize: responsiveFontSize(14), color: '#ffffff99', marginBottom: responsiveWidth(3), marginLeft: responsiveWidth(5) }}
              />
            </TouchableOpacity>
            : null
          }
          {currentCreateIndex === 0 || currentCreateIndex === 2 ?
            <View style={{ paddingHorizontal: responsiveWidth(5) }}>
              <Headliner
                text={'Marriage DAO 💍'}
                textStyle={{ textAlign: 'center' }}
              />
              <Headliner
                text={'Consumate Your Marriage on the Blockchain'}
                textStyle={{ textAlign: 'center', fontSize: responsiveFontSize(14), color: '#ffffff99', marginBottom: responsiveWidth(3) }}
              />
              <TabsView
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                routes={[
                  {
                    key: 'create',
                    title: 'Create',
                  },
                  {
                    key: 'history',
                    title: 'History',
                  }
                ]}
              />
            </View>
            : null
          }
        </>
        <ScrollView style={{ padding: responsiveWidth(5) }} showsVerticalScrollIndicator={false}>
          {activeTab === 'create' ?
            <>
              {currentCreateIndex === 0 ?
                <>
                  <Headliner
                    text={'Spouse 1'}
                    textStyle={{ fontSize: responsiveFontSize(22) }}
                  />
                  <TextInputter
                    placeholder={'Name'}
                    value={contractDetails?.spouseOneName}
                    onChangeText={(text: string) => setContractDetails({
                      ...contractDetails,
                      spouseOneName: text
                    })
                    }
                  />
                  <Headliner
                    text={'Spouse 2'}
                    textStyle={{ fontSize: responsiveFontSize(22), marginTop: responsiveHeight(3) }}
                  />
                  <TextInputter
                    placeholder={'Name'}
                    value={contractDetails?.spouseTwoName}
                    onChangeText={(text: string) => setContractDetails({
                      ...contractDetails,
                      spouseTwoName: text
                    })
                    }
                  />
                  <Headliner
                    text={'Agreement Duration'}
                    textStyle={{ fontSize: responsiveFontSize(22), marginTop: responsiveHeight(3) }}
                  />
                  <TextInputter
                    placeholder={'Years until 50/50 (e.g.: 5, 10, etc.)'}
                    value={contractDetails?.numberOfYearsUntil5050}
                    onChangeText={(text: string) => setContractDetails({
                      ...contractDetails,
                      numberOfYearsUntil5050: text
                    })
                    }
                  />
                  {contractDetails?.spouseOneName && contractDetails?.spouseTwoName && contractDetails?.numberOfYearsUntil5050 ?
                    <CustomButton
                      label={"Confirm"}
                      onPress={() => setCurrentCreateIndex(1)}
                      style={{ marginTop: responsiveHeight(4), backgroundColor: !contractDetails?.spouseOneName && !contractDetails?.spouseTwoName && !contractDetails?.numberOfYearsUntil5050 ? '#ff69b499' : '#ff69b4' }}
                    />
                    : null
                  }
                </>
                : null
              }
              {currentCreateIndex === 1 ?
                <>
                  <Headliner
                    text={'Vesting Schedule'}
                    textStyle={{ fontSize: responsiveFontSize(22) }}
                  />
                  {contractDetails?.vestingPeriods?.map((period: any, index: number) => (
                    <View key={`index${index}`} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <TextInputter
                        placeholder={'Year'}
                        value={contractDetails?.vestingPeriods[index]?.year}
                        style={{ width: responsiveWidth(40) }}
                        onChangeText={(text: string) => {
                          let newVestingPeriods = contractDetails?.vestingPeriods
                          newVestingPeriods[index].year = text
                          setContractDetails({
                            ...contractDetails,
                            vestingPeriods: newVestingPeriods
                          })
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => onPressTrashCan(index)}
                        style={{ height: responsiveWidth(10), justifyContent: 'flex-end' }}
                      >
                        <Ionicons name="trash-outline" size={22} color={'#ffffff50'} style={{ top: StyleSheet.hairlineWidth * 10 }} />
                      </TouchableOpacity>
                      <TextInputter
                        placeholder={'Percentage'}
                        value={contractDetails?.vestingPeriods[index]?.percentage}
                        style={{ width: responsiveWidth(40) }}
                        onChangeText={(text: string) => {
                          let newVestingPeriods = contractDetails?.vestingPeriods
                          newVestingPeriods[index].percentage = text
                          setContractDetails({
                            ...contractDetails,
                            vestingPeriods: newVestingPeriods
                          })
                        }}
                      />
                    </View>
                  ))}
                  <CustomButton
                    label={"Add Another Year (+)"}
                    onPress={onPressAddAnotherYear}
                    style={{ marginTop: responsiveHeight(4), backgroundColor: '#ff69b420', borderColor: '#ff69b4', borderWidth: StyleSheet.hairlineWidth * 2 }}
                  />
                  <CustomButton
                    label={"Get Married!"}
                    onPress={() => setCurrentCreateIndex(2)}
                    style={{ backgroundColor: !contractDetails?.spouseOneName && !contractDetails?.spouseTwoName && !contractDetails?.numberOfYearsUntil5050 ? '#ff69b499' : '#ff69b4' }}
                  />
                </>
                : null
              }
              {currentCreateIndex === 2 ?
                <View style={{ paddingHorizontal: responsiveWidth(5) }}>
                  <Headliner
                    text={`Congratulations! 💍\n\nYou've been married!`}
                    textStyle={{ fontSize: responsiveFontSize(22), textAlign: 'center', marginBottom: responsiveHeight(3) }}
                  />
                  <CustomButton
                    label={"View Contract"}
                    onPress={onPressViewCompletedContract}
                    style={{ backgroundColor: 'transparent', borderColor: '#ff69b4', borderWidth: StyleSheet.hairlineWidth * 2, }}
                  />
                  <CustomButton
                    label={"Get Married Again"}
                    onPress={onPressGetMarriedAgain}
                    style={{ backgroundColor: 'transparent', borderColor: '#ff69b4', borderWidth: StyleSheet.hairlineWidth * 2, }}
                  />
                </View>
                : null
              }
            </>
            :
            null
          }
          {activeTab === 'history' ?
            <></>
            :
            null
          }
        </ScrollView>
      </SafeAreaView>
      {/* START — USER LOGOUT POPUP */}
      {isLogoutModalOpen ?
        <View style={{ position: 'absolute', top: responsiveHeight(13), right: responsiveHeight(2), backgroundColor: '#1c1c1c', borderRadius: responsiveWidth(5), borderColor: '#ff69b4', borderWidth: StyleSheet.hairlineWidth * 2, width: responsiveWidth(44), padding: responsiveWidth(3) }}>
          <TouchableOpacity
            onPress={() => { return logout() }}
            style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="exit-outline" size={22} color={'white'} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: 'white'
                }}>
                {'Sign Out'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsLogoutModalOpen(false)}
            style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="return-down-back" size={22} color={'white'} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: 'white'
                }}>
                {'Cancel'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        :
        null
      }
      {/* END — USER LOGOUT POPUP */}
    </>
  );
}
