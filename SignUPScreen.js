import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput as PaperTextInput, Provider as PaperProvider } from 'react-native-paper';

const SignupScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [firmName, setFirmName] = useState('');
  const [gstin, setGstin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '253616364449-vd0gktp31k69vnnng8rqhjnehahu7pcq.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);

  const handleSignup = () => {
    let valid = true;

    // Reset error messages
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      valid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long, contain at least one special character, and contain at least two numbers');
      valid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    if (valid) {
      console.log('Signup button pressed');
      // Proceed with signup logic
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      // Use userInfo to auto-fill the signup form or directly sign up the user
      setEmail(userInfo.user.email);
      setFirstName(userInfo.user.givenName);
      setLastName(userInfo.user.familyName);

      // Optionally, you could also auto-submit the form here if you want to complete signup automatically
      // handleSignup();

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error happened:', error);
      }
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Signup to your Account</Text>

        <View style={styles.row}>
          <PaperTextInput
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.inputHalf}
            mode="outlined"
          />
          <PaperTextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.inputHalf}
            mode="outlined"
          />
        </View>
        <PaperTextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
          error={!!phoneError}
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
        <PaperTextInput
          label="Email ID"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          error={!!emailError}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <PaperTextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          mode="outlined"
        />
        <PaperTextInput
          label="Firm Name"
          value={firmName}
          onChangeText={setFirmName}
          style={styles.input}
          mode="outlined"
        />
        <PaperTextInput
          label="GSTIN No."
          value={gstin}
          onChangeText={setGstin}
          style={styles.input}
          mode="outlined"
        />
        <View style={styles.passwordContainer}>
          <PaperTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry={!passwordVisible}
            error={!!passwordError}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#000" />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <View style={styles.passwordContainer}>
          <PaperTextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry={!confirmPasswordVisible}
            error={!!confirmPasswordError}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Icon name={confirmPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="#000" />
          </TouchableOpacity>
        </View>
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Icon name="google" size={20} color="#fff" style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Sign Up with Google</Text>
        </TouchableOpacity>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputHalf: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#051650',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#051650',
    borderRadius: 5,
    marginTop: 20,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default SignupScreen;
