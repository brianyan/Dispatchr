import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

class RateUserView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 3.5
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      rating: rating
    });
  }

  _submitRating() {
    this.props.submitRating({
      rating: this.state.rating,
      id: this.props.user.id
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Submit a review for { this.props.user.username } </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={this.state.rating}
          starColor={'gold'}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
        />
      <TouchableHighlight onPress={this._submitRating.bind(this)} style={styles.submitButton}>
          <Text style={{color: "white"}}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginTop: 100
  },
  header: {
    fontWeight: "bold",
    fontSize: 18
  },
  submitButton: {
    flex: 1,
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50
  },
});


/* Connects to the actions, so we can do stuff! Boilerplate!!! */
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    rating: state.rating
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RateUserView);
