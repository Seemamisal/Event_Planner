import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon from react-native-vector-icons

const FloatingLabelInput = ({ label, value, onChangeText, secureTextEntry, keyboardType, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <View style={styles.inputContainer}>
      <Text style={[
        styles.label,
        {
          top: isFocused || value ? -10 : 12,
          left: isFocused || value ? 10 : 15,
          fontSize: isFocused || value ? 12 : 16,
          color: isFocused || value ? 'black' : 'gray',
          backgroundColor: isFocused || value ? 'white' : 'transparent',
          paddingHorizontal: isFocused || value ? 5 : 0,
        }
      ]}>
        {label}
      </Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { borderColor: isFocused ? '#2196F3' : 'gray' }]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          placeholder={''}
          placeholderTextColor={'transparent'}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const getPasswordError = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one digit');
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one symbol (!@#$%^&*(),.?":{}|<>)');
  }

  return errors;
};

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleLogin = () => {
    let valid = true;

    if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    const passwordValidationErrors = getPasswordError(password);
    if (passwordValidationErrors.length > 0) {
      setPasswordErrors(passwordValidationErrors);
      valid = false;
    } else {
      setPasswordErrors([]);
    }

    if (valid) {
      navigation.navigate('DashBoard', { email, password });
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleGoogleLogin = () => {
    // Implement Google login functionality
    console.log('Implement Google login');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainSection}>
          <Text style={styles.title}>Login to Your Account</Text>
          <FloatingLabelInput
            label="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={emailError}
          />
          <FloatingLabelInput
            label="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          {passwordErrors.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              {passwordErrors.map((error, index) => (
                <Text key={index} style={styles.errorText}>{error}</Text>
              ))}
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <Icon name="google" size={20} color="white" style={styles.icon} />
            <Text style={[styles.buttonText, { marginLeft: 10 }]}>Login with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.linkText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text>Contact information</Text>
        <Text>Privacy Policy | Terms of Service</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  mainSection: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    zIndex: 1,
    paddingHorizontal: 2,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },
  linkText: {
    color: '#051650',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#051650',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  googleButton: {
    backgroundColor: '#051650',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row', // Align icon and text horizontally
    justifyContent: 'center', // Center contents horizontally
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default LoginPage;
