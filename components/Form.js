import React, {Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native'

const styles = StyleSheet.create({
    textInput: {
      padding: 10,
      width: '100%',
      
    },
    searchButton: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#841584",
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
                <Text>Wpisz nazwę szukanego miasta:</Text>
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

