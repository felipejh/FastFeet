import styled from 'styled-components';
import {
  MdMoreHoriz,
  MdRemoveRedEye,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';
import colors from '~/styles/colors';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
`;

export const MdMore = styled(MdMoreHoriz)`
  color: #444;
  size: 20px;
`;

export const MdEye = styled(MdRemoveRedEye)`
  size: 20px;
  color: ${colors.primary};
`;

export const MdCustomEdit = styled(MdEdit)`
  size: 20px;
  color: #4d85ee;
`;

export const MdDelete = styled(MdDeleteForever)`
  size: 20px;
  color: ${colors.primaryCanceled};
`;

export const ActionList = styled.div`
  position: absolute;
  width: ${props => (props.cancel ? '200px' : '150px')};
  left: calc(50% - 75px);
  top: calc(100% + 15px);
  background: #fff;
  border-radius: 4px;
  padding: 15px 5px;
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 1px rgba(0, 0, 0, 0.1);
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 8px);
    top: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #fff;
  }

  div {
    color: #999;

    display: flex;
    align-items: center;
    justify-content: left;
    margin: 5px;

    & + div {
      margin: 5px 5px;
      padding-top: 15px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    p {
      font-size: 16px;
      line-height: 18px;
      margin-left: 5px;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: 'none';
      border: 0;
      border-radius: 4px;
      color: #999;
      font-size: 16px;
      margin-left: 5px;
    }
  }
`;
