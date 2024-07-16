
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Animated } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';


const FloatingLabelInput = ({ label, value, onChangeText, keyboardType }) => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedIsFocused, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        position: 'absolute',
        left: 10,
        top: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [18, -8],
        }),
        fontSize: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: ['#aaa', '#000'],
        }),
        backgroundColor: '#fff',
        paddingHorizontal: 2,
    };

    return (
        <View style={styles.field}>
            <Animated.Text style={labelStyle}>
                {label}
            </Animated.Text>
            <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType={keyboardType}
            />
        </View>
    );
};


const CreateQuotation = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [emailId, setEmailId] = useState('');
    const [gstin, setGstin] = useState('');
    const [quotationDate, setQuotationDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [quotationTime, setQuotationTime] = useState(new Date());
    const [venueDetails, setVenueDetails] = useState('');
    const [items, setItems] = useState([]);


    const handleSharePDF = async () => {
        // Prepare HTML content for PDF
        const htmlContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                        }
                        h1 {
                            color: #000;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 20px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h1>Quotation Details</h1>
                    <table>
                        <tr>
                            <th>Customer Name</th>
                            <td>${customerName}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>${phoneNumber}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>${address}</td>
                        </tr>
                        <!-- Add more details as needed -->
                    </table>
                </body>
            </html>
        `;

        try {
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            console.log('PDF saved to:', uri);

            // Share the generated PDF
            await shareAsync(uri);
        } catch (error) {
            console.error('Failed to generate or share PDF:', error);
            Alert.alert('Error', 'Failed to generate or share PDF. Please try again.');
        }
    };


    useEffect(() => {
        if (route.params?.newItem) {
            setItems([...items, route.params.newItem]);
        }
    }, [route.params?.newItem]);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || quotationDate;
        setShowDatePicker(false);
        setQuotationDate(currentDate);
    };

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || quotationTime;
        setShowTimePicker(false);
        setQuotationTime(currentTime);
    };

    const addItem = () => {
        navigation.navigate('CreateNewEntry');
    };
    const handleSave1 = async () => {
        // Assuming quotationData is properly set up

        // Navigate to CreateInvoice and pass quotationData as params
        navigation.navigate('ViewInvoice', {
            customerName, phoneNumber, address, emailId, gstin, quotationDate, venueDetails, items
        });
    };

    const handleSave = async () => {
        const quotationData = {
            customerName,
            phoneNumber,
            address,
            emailId,
            gstin,
            quotationDate,
            quotationTime,
            venueDetails,
            items,
        };

        try {
            const response = await fetch('http://192.168.0.108:3000/quotation', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(quotationData),
            });

            if (response.ok) {
                Alert.alert('Success', 'Quotation saved successfully!');
            } else {
                Alert.alert('Error', 'Failed to save quotation.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while saving the quotation.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Quotation</Text>

            <View style={styles.topField}>
                <View style={styles.halfField}>
                    <Text style={styles.label1}>Quotation Number</Text>
                    <Text style={styles.label1}>01</Text>
                </View>

                {/* Vertical line */}
                <View style={{ width: 1, backgroundColor: '#ccc' }} />

                <View style={styles.halfField}>
                    <Text style={styles.label1}>Date:</Text>
                    <Text>{quotationDate.toDateString()}</Text>
                </View>
            </View>

            <FloatingLabelInput
                label="Enter Customer Name"
                value={customerName}
                onChangeText={setCustomerName}
            />
            <FloatingLabelInput
                label="Enter Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <FloatingLabelInput
                label="Enter Address"
                value={address}
                onChangeText={setAddress}
            />
            <FloatingLabelInput
                label="Enter Email ID"
                value={emailId}
                onChangeText={setEmailId}
                keyboardType="email-address"
            />
            <FloatingLabelInput
                label="Enter GSTIN No"
                value={gstin}
                onChangeText={setGstin}
            />
            <FloatingLabelInput
                label="Enter Venue Details"
                value={venueDetails}
                onChangeText={setVenueDetails}
            />

            <TouchableOpacity style={styles.linkButton} onPress={addItem}>
                <Text style={styles.linkButtonText}>+ Add Item</Text>
            </TouchableOpacity>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSharePDF}>
                    <Text style={styles.buttonText}>Share PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSave1}>
                    <Text style={styles.buttonText}>Convert to Invoice</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    topField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
        backgroundColor: "#F0F0F0",
        borderRadius: 7,
    },
    halfField: {
        flex: 1,
        marginRight: 10,
        justifyContent: 'center',
    },
    label1: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    field: {
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    inputFocused: {
        borderColor: '#007BFF',
    },
    buttonsContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#00008B',
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    linkButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: '#00008B',
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
    },
    linkButtonText: {
        color: '#00008B',
        fontSize: 16,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});

export default CreateQuotation;
