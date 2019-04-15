import React, { Component } from 'react';
import { FlatList, StyleSheet, Animated, View, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const { height, width } = Dimensions.get('screen')

export default class App extends Component {
  state = {
    shouldShowStickerHeader: true,
    scrollY: new Animated.Value(1)
  }

  componentDidMount() {
    this.state.scrollY.addListener(({ value }) => {
      const shouldShowStickerHeader = value > 90
      this.setState({ shouldShowStickerHeader, animatedPadding: value})
    })
  }

  keyExtractor = item => item.toString()

  renderItem = item => {
    const { evenRowStyle, oddRowStyle } = styles
    if (item % 2 == 0)
      return <View style={evenRowStyle} />
    return <View style={oddRowStyle} />
  }

  renderStickerHeader = () => {
    const { stickerHeaderStyle } = styles;
    return (
      <View style={stickerHeaderStyle}>
        <Icon
          name='ios-american-football'
          type='ionicon'
          color='#517fa4'
        />

        <Icon
          type='font-awesome'
          color='red'
          name='heartbeat'
        />

        <Icon
          name='ios-american-football'
          type='ionicon'
          color='#517fa4'
        />

        <Icon
          type='font-awesome'
          color='red'
          name='heartbeat'
        />
      </View>
    )
  }

  renderHeader = () => {
    const { animatedViewStyle } = styles
    let { shouldShowStickerHeader, animatedPadding } = this.state
    
    if (animatedPadding > 90) animatedPadding = 90
    const animatedStyle = {
      paddingLeft: animatedPadding,
      paddingRight: animatedPadding / 2
    }

    if( !shouldShowStickerHeader ) {
      return (
        <Animated.View style={[ animatedViewStyle, animatedStyle ]}>
          <Icon
            reverse
            name='ios-american-football'
            type='ionicon'
            color='#517fa4'
          />
  
          <Icon
            reverse
            type='font-awesome'
            color='red'
            name='heartbeat'
          />
  
          <Icon
            reverse
            name='ios-american-football'
            type='ionicon'
            color='#517fa4'
          />
  
          <Icon
            reverse
            type='font-awesome'
            color='red'
            name='heartbeat'
          />
        </Animated.View>
      )
    }
    return <View />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.shouldShowStickerHeader && this.renderStickerHeader()}
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={rows}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => this.renderItem(item)}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
        >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  evenRowStyle: {
    width,
    backgroundColor: 'lightblue',
    height: height * 0.2
  },
  oddRowStyle: {
    width,
    backgroundColor: 'lightpink',
    height: height * 0.2
  },
  stickerHeaderStyle: {
    width,
    height: 90,
    paddingLeft: 80,
    paddingRight: 48,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: 'yellow'
  },
  animatedViewStyle: { 
    width, 
    height: 188, 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    backgroundColor: 'yellow', 
    justifyContent: 'space-around' 
  }
});
