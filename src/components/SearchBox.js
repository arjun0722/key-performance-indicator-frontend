// src/components/SearchBox.js

import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const SearchBox = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Perform search using Google Places API
    // Implement your custom logic here
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for clubs"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default SearchBox;