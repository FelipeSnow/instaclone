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
  Loading,
} from './styles';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return; // não executar código abaixo dessa linha caso o if retorne true, afim de otimizar as chamadas de api

    setLoading(true);

    const response = await fetch(
      `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`,
    );

    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count');

    setTotal(Math.ceil(totalItems / 5)); // Atualmente a api retorna 4 paginas (20 items)
    setFeed(shouldRefresh ? data : [...feed, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <View>
      <FlatList
        data={feed}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        keyExtractor={post => String(post.id)}
        ListFooterComponent={loading && <Loading />}
        onRefresh={refreshList}
        refreshing={refreshing}
        renderItem={({item}) => (
          <Post>
            <Header>
              <Avatarx
                ratio={item.author.avatar.aspectRatio}
                source={{uri: item.author.avatar}}
              />
              <Name>{item.author.name}</Name>
            </Header>

            <PostImage ratio={item.aspectRatio} source={{uri: item.image}} />
            {/* <Actions>
              <Left>
                <Action source={like} />
                <Action source={comment} />
                <Action source={share} />
              </Left>
              <Action source={save} />
            </Actions> */}
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
