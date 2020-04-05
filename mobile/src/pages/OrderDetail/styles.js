import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const HeaderBackground = styled.View`
  background: ${colors.primary};
  height: 100px;
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: -100px 20px 0px;
  border-radius: 4px;
`;

export const Container = styled.SafeAreaView`
  background: #fff;
  flex: 1;
  z-index: 1;
`;

export const Information = styled.View`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  margin: 0px 0px 5px;
  padding: 10px 15px 0;
`;

export const Situation = styled.View`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  margin: 0px 0px 5px;
  padding: 10px 15px 0;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.primary};
  margin-left: 10px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999;
  margin-top: 5px;
`;

export const Field = styled.Text`
  font-size: 14px;
  color: #666;
  margin: 5px 0 10px;
`;

export const Dates = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DateBlock = styled.View``;

export const Actions = styled.View`
  margin: 0px 0px 5px;
  flex-direction: row;
  justify-content: center;
  height: 85px;
`;

export const WithdrawOrder = styled.TouchableOpacity`
  background: #f8f9fd;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  padding: 10px;
  flex: 1;
  align-items: center;
`;

export const InformProblem = styled.TouchableOpacity`
  background: #f8f9fd;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  padding: 10px;
  flex: 1;
  align-items: center;
`;

export const ViewProblem = styled.TouchableOpacity`
  background: #f8f9fd;
  margin: 0 1px;

  border-left-color: #999;
  border-left-width: 1px;

  border-right-color: #999;
  border-right-width: 1px;

  padding: 10px;
  flex: 1;
  align-items: center;
`;

export const ConfirmDelivery = styled.TouchableOpacity`
  background: #f8f9fd;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  padding: 10px;
  flex: 1;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 12px;
  color: #999;
  text-align: center;
  padding: 5px;
`;
