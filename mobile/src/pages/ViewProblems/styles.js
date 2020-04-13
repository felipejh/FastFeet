import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const HeaderBackground = styled.View`
  background: ${colors.primary};
  height: 100px;
`;

export const Container = styled.SafeAreaView`
  background: #fff;
  flex: 1;
`;

export const ProblemContainer = styled.View`
  margin: -50px 20px;
  z-index: 1;
`;

export const OrderDescription = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  align-self: center;
`;

export const ListProblems = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  height: 100%;
`;

export const Problem = styled.View`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 20px;
  margin-top: 10px;

  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const DescriptionProblem = styled.Text`
  font-size: 16px;
  color: #999;
`;

export const DateProblem = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
`;
