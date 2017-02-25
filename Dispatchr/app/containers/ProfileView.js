import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableHighlight
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

const storage = firebase.storage();

const uploadImage = (uri, userId, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    const oldXML = window.XMLHttpRequest;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    // TODO: When auth works use the current user_id
    const imageRef = storage.ref('users').child(userId);

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        window.XMLHttpRequest = oldXML;
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: 'https://res.cloudinary.com/courbanize-production/image/upload/default_avatar.png'
    };
    storage.ref('users').child(props.userId).getDownloadURL().then(function(url) {
      this.setState({uri: url});
    }.bind(this)).catch(function(error) {
      this.setState({uri: 'https://res.cloudinary.com/courbanize-production/image/upload/default_avatar.png'});
    }.bind(this));

    this.props.getUser(props.userId);
  }

  render() {
    const {user} = this.props;
    return (
      <View style={styles.viewContainer}>
        <TouchableHighlight onPress={this._showUploadPrompt.bind(this)}>
          <Image style={styles.imageRound} source = {{uri: this.state.uri}}/>
        </TouchableHighlight>
        <Text style={styles.nameLabel}>{user == undefined ? '' : user.name}</Text>
        {this.renderReputationStars()}
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  renderReputationStars() {
    var stars = [];
    for (var i = 0; i < this.props.user.reputation; i++) {
      stars.push(<Icon name="star" size={20} color="gold" key={"s" + i}/>);
    }
    return <View style={styles.reputation}>{stars}</View>;
  }

  _showUploadPrompt() {
    var options = {
      title: 'Upload Profile Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (!(response.didCancel || response.error)) {
        uploadImage(response.uri, this.props.userId)
          .then(url => this.setState({ uri: url }))
          .catch(error => console.log(error))
      }
    });
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
  },
  imageRound: {
    marginTop: 20,
    marginBottom: 10,
    height: 120,
    width: 120,
    borderRadius: 60
  },
  nameLabel: {
    fontSize: 20
  },
  reputation: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row'
  }
});

/* Connects to the actions, so we can do stuff! Boilerplate!!! */
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.users.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
