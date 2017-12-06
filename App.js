/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, Image , View, ScrollView, WebView, ListView, Button, Alert, FlatList, SectionList, StyleSheet, ActivityIndicator } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

class BlinkApp extends Component {
  render() {
    return (
      <View>
        <Blink text='I love to blink' />
        <Blink text='Yes blinking is so great' />
        <Blink text='Why did they ever take this out of HTML' />
        <Blink text='Look at me look at me look at me' />
      </View>
    );
  }
}

class FlatListBasics extends Component {
  render() {
    return (
      <View style={stylesFlatList.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={stylesFlatList.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}

const stylesFlatList = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

class SectionListBasics extends Component {
  render() {
    return (
      <View style={stylesSectionList.container}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={stylesSectionList.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={stylesSectionList.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const stylesSectionList = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

class Movies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		}
	}

	componentDidMount() {
		return fetch('https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0')
			.then((response) => response.json())
			.then((responseJson) => {
				let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
				this.setState({
					isLoading: false,
					dataSource: ds.cloneWithRows(responseJson.subjects),
				}, function() {
					// do something with new state
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		if (this.state.isLoading) {
			return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
			);
		}

		return (
            <View style={{flex: 1, paddingTop: 20}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData.title}, {rowData.id}</Text>}
                />
            </View>
		);
	}
}

export default class HelloWorldApp extends Component {
  render() {
    return (
      <ScrollView style={{marginTop: 20}}>
        <View style={{alignItems: 'center'}}>
            <Text>
                ✅ Movies
            </Text>
            <Movies />

            <Text>
            ✅ FlatListBasics
          </Text>
          <FlatListBasics />

          <Text>
            ✅ SectionListBasics
          </Text>
          <SectionListBasics />

          <Text>
            ✅ WebView
          </Text>
          <WebView
            source={{uri: 'https://github.com/'}}
            style={{width: 300, height: 400}}
          />

          <Text>
            ✅ BlinkApp
          </Text>
          <BlinkApp />

          <Text>
            ✅ Button
          </Text>
          <Button
            onPress={() => {
              Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            }}
            title="Press Me"
          />

          <Text>
            ✅ Greeting
          </Text>
          <Greeting name='Haijian' />
          <Greeting name='Faith' />
          <Greeting name='Qingqing' />

          <Text>
            ✅ Image
          </Text>
          <Image source={require('./images/timg.jpeg')} style={{width: 300, height: 400}}/>

          <Text>
            ✅ View
          </Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
            <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
            <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
          </View>
          <View>
            <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
            <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
            <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

// skip this line if using Create React Native App

AppRegistry.registerComponent('AwesomeProject', () => HelloWorldApp);
