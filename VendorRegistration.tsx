import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { TextInput } from "react-native-paper";

interface Props {
  navigation: NavigationProp<any>;
}

const VendorRegistration: React.FC<Props> = ({ navigation }) => {
  const [vendorName, setVendorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const [vendorNameFocused, setVendorNameFocused] = useState(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [addressFocused, setAddressFocused] = useState(false);
  const [gstNumberFocused, setGstNumberFocused] = useState(false);

  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleSave = () => {
    // Validate the phone number field
    if (!phoneNumber) {
      setPhoneNumberError("Phone number is required.");
      return;
    }

    // Clear the error message if validation passes
    setPhoneNumberError("");

    // Handle the save action here
    console.log({
      vendorName,
      phoneNumber,
      address,
      gstNumber,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Vendor Name"
        value={vendorName}
        onChangeText={setVendorName}
        style={[styles.input, vendorNameFocused && styles.focusedInput]}
        onFocus={() => setVendorNameFocused(true)}
        onBlur={() => setVendorNameFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
      />
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={[styles.input, phoneNumberFocused && styles.focusedInput]}
        onFocus={() => setPhoneNumberFocused(true)}
        onBlur={() => setPhoneNumberFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
        error={!!phoneNumberError}
      />
      {phoneNumberError ? (
        <Text style={styles.errorText}>{phoneNumberError}</Text>
      ) : null}
      <TextInput
        label="Address"
        value={address}
        onChangeText={setAddress}
        style={[styles.input, addressFocused && styles.focusedInput]}
        onFocus={() => setAddressFocused(true)}
        onBlur={() => setAddressFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
      />
      <TextInput
        label="GSTIN No."
        value={gstNumber}
        onChangeText={setGstNumber}
        style={[styles.input, gstNumberFocused && styles.focusedInput]}
        onFocus={() => setGstNumberFocused(true)}
        onBlur={() => setGstNumberFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("AddItem")}>
        <Text style={[styles.addItemText, { color: "#051650" }]}>
          + Add Item
        </Text>
      </TouchableOpacity>

      {/* Spacer to push the Save button to the bottom */}
      <View style={styles.spacer} />

      <TouchableOpacity
        onPress={handleSave}
        style={[styles.button, { backgroundColor: "#051650" }]}
      >
        <Text style={styles.saveButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 500,
  },
  focusedInput: {
    borderColor: "blue",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#051650",
  },
  saveButtonText: {
    fontSize: 16,
    color: "white",
  },
  addItemText: {
    fontSize: 16,
    color: "#051650",
    textDecorationLine: "underline",
  },
  spacer: {
    flex: 1,
  },
});

export default VendorRegistration;
