import React from 'react';
import { View, TextInput } from 'react-native';

const CustomTextArea = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
    />
  );
}

export default CustomTextArea;