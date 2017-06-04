import React, { Component } from 'react'
import { View, PanResponder, Animated } from 'react-native'

class Deck extends Component {
  constructor(props) {
    super(props);

    var positionX, positionY;
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
        positionX = gesture.dx;
        positionY = gesture.dy;
        return true;
      },
      onPanResponderRelease: (evt, gestureState) => {
      },
    });


    this.state = { panResponder, position };
  }

  getCardStyle = () => {
    return {
      ...this.state.position.getLayout(),
      transform: [{rotate: '45deg'}]
    }
  }

  renderCards() {
    return this.props.data.map((item, index) => {
        if (index === 4 ) {
          return (
            <Animated.View
               key={item.id}
               style={this.getCardStyle()}
               {...this.state.panResponder.panHandlers}
            >
               {this.props.renderCard(item)}
            </Animated.View>
          )
        }
    });
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    )
  }
}

export default Deck
