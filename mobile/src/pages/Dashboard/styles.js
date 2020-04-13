import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  margin: 20px 20px 0;
  flex: 1px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
`;

export const TextHeader = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 0 10px;
`;

export const Welcome = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Deliveryman = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const Logout = styled(Icon).attrs({
  name: 'exit-to-app',
  size: 30,
  color: '#E74040',
})``;

export const PageTitle = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
  flex: 3;
`;

export const TypeDeliveryContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  flex: 2;
`;

export const PendingButton = styled.TouchableOpacity`
  border-bottom-width: 2px;
  border-bottom-color: ${props =>
    props.active ? colors.primary : 'transparent'};
  padding: 1px;
  margin: 0 5px;
`;

export const PendingText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.active ? colors.primary : '#999')};
`;

export const DeliveredButton = styled.TouchableOpacity`
  border-bottom-width: 2px;
  border-bottom-color: ${props =>
    props.active ? colors.primary : 'transparent'};
  padding: 1px;
  margin: 0 5px;
`;

export const DeliveredText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.active ? colors.primary : '#999')};
`;

export const PendingList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
  opacity: ${props => (props.loading ? 0.4 : 1)};
`;

export const PendingItem = styled.View`
  border: #eee;
  border-radius: 4px;
  margin-bottom: 15px;
`;

export const TopContainer = styled.View`
  padding: 15px;
`;

export const Delivery = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconTruck = styled(Icon).attrs({
  name: 'local-shipping',
  size: 20,
  color: colors.primary,
})``;

export const Name = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  color: ${colors.primary};
`;

export const BottomContainer = styled.View`
  background: #f8f9fd;
  flex-direction: row;
  padding: 15px;
  align-items: flex-end;
  justify-content: space-between;
`;

export const DateContainer = styled.View``;

export const Label = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999;
`;

export const Description = styled.Text`
  font-size: 12px;
  color: #444;
  font-weight: bold;
`;

export const CityContainer = styled.View``;

export const LinkDetails = styled.TouchableOpacity``;

export const LinkDetailsText = styled.Text`
  color: ${colors.primary};
  font-size: 12px;
  font-weight: bold;
`;

export const AvatarLetters = styled.View`
  width: 68px;
  height: 68px;
  border-radius: 34px;
  align-items: center;
  justify-content: center;
  background: #f4effc;
`;

export const Letters = styled.Text`
  font-size: 31px;
  color: #a28fd0;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'large',
  color: colors.primary,
})``;

export const LoadingContainer = styled.View`
  position: absolute;
  justify-content: center;
  align-self: center;
  height: 100%;
  z-index: 1;
`;
