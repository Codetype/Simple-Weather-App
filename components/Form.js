import React, {Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native'

const styles = StyleSheet.create({
    textInput: {
      paddingTop: 10,
      paddingBottom: 2,
      marginBottom: 8,
      width: '100%',
      color: '#fff',
      borderBottomColor: '#FFF',
      borderBottomWidth: 1
    },
    searchButton: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#193776",
    },
    buttonLabel: {
        color: '#ffffff',
    }
});

export default class Form extends Component {
    constructor(){
        super();
    }

    render () {
        return (
            <View>
                <Text style={{color: '#fff'}}>Wpisz nazwę szukanego miasta:</Text>
                <TextInput
                    style={styles.textInput}
                    value={this.props.value}
                    onChangeText = {(text) => this.props.change(text)}
                />
                <TouchableOpacity
                    onPress={this.props.submit}
                    style={styles.searchButton}
                >
                    <Text style={styles.buttonLabel}>Szukaj</Text>
                </TouchableOpacity>
            </View>
        )
    }
};

