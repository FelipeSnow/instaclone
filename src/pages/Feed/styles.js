import styled from 'styled-components/native';

export const Post = styled.View`
  margin-bottom: 20px;
`;
export const Header = styled.View`
  display: flex;
  flex-direction: row;
`;
export const Avatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: ${50};
  border: 3px solid palevioletred;
  margin-right: 7px;
`;
export const Name = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;
export const PostImage = styled.Image`
  width: 100%;
  aspect-ratio: ${props => props.ratio};
`;
export const Description = styled.Text`
  margin-left: 10px;
`;

export const Actions = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const Left = styled.View`
  flex-direction: row;
`;

export const Action = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  margin-bottom: 15px;
  margin-top: 10px;
`;
