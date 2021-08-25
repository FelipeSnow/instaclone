import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

import like from '../../assets/like.png';
import share from '../../assets/share.png';
import comment from '../../assets/comment.png';
import save from '../../assets/save.png';

import {
  Post,
  Header,
  Avatar,
  Name,
  PostImage,
  Description,
  Actions,
  Left,
  Action,
} from './styles';

const Feed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    async function loadFeed() {
      const response = await fetch(
        'http://localhost:3000/feed?_expand=author&_limit=5&_page=1',
      );

      const data = await response.json();
      setFeed(data);
    }
    loadFeed();
  }, []);
  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={post => String(post.id)}
        renderItem={({item}) => (
          <Post>
            <Header>
              <Avatar
                ratio={item.author.avatar.aspectRatio}
                source={{uri: item.author.avatar}}
              />
              <Name>{item.author.name}</Name>
            </Header>

            <PostImage ratio={item.aspectRatio} source={{uri: item.image}} />
            <Actions>
              <Left>
                <Action source={like} />
                <Action source={comment} />
                <Action source={share} />
              </Left>
              <Action source={save} />
            </Actions>
            <Description>
              <Name>{item.author.name} </Name>
              {item.description} orem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </Description>
          </Post>
        )}
      />
    </View>
  );
};

export default Feed;
