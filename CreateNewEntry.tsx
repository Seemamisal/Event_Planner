
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const CreateNewEntry = ({ route }) => {
    const navigation = useNavigation();

    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDiscount, setItemDiscount] = useState('');
    const [itemTotalPrice, setItemTotalPrice] = useState('');
    const [itemMisc, setItemMisc] = useState('');

    useEffect(() => {
        // Calculate the total item price based on price and discount
        const price = parseFloat(itemPrice) || 0;
        const discount = parseFloat(itemDiscount) || 0;
        const discountedPrice = price - (price * (discount / 100));
        setItemTotalPrice(discountedPrice.toFixed(2)); // Update total price
    }, [itemPrice, itemDiscount]);

    const handleSaveItem = () => {
        const newItem = {
            itemName,
            itemQuantity,
            itemPrice,
            itemDiscount,
            itemTotalPrice,
            itemMisc
        };

        // Pass the new item back to the CreateQuotation screen
        navigation.navigate('CreateQuotation', { newItem });
    };

    return (
      
        <View style={styles.container}>
              <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Item</Text>
            <FloatingLabelInput
                label="Item Name"
                value={itemName}
                onChangeText={setItemName}
            />
            <FloatingLabelInput
                label="Quantity"
                value={itemQuantity}
                onChangeText={setItemQuantity}
                keyboardType="numeric"
            />


            <View style={{ backgroundColor: 'grey',borderRadius:6 }}>

                <View style={{ flexDirection: 'row', alignContent: 'space-evenly', alignItems: 'center', flex: 1 }}>
                    <label style={{flex:1,marginLeft:10}}>Price</label>
                    <TextInput
                        style={styles.priceInput}
                        placeholder="Item Price"
                        value={itemPrice}
                        onChangeText={setItemPrice}
                        keyboardType="numeric"
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignContent: 'space-between',
                    alignItems: 'center',
                    flex: 1,


                }}>
                    <label style={{flex:1,marginLeft:10}}>Discount</label>
                    <TextInput
                        style={styles.priceInput}
                        placeholder="Discount"
                        value={itemDiscount}
                        onChangeText={setItemDiscount}
                        keyboardType="numeric"
                    />
                </View>

                <View style={{ flexDirection: 'row', alignContent: 'space-evenly', alignItems: 'center' }}>
                    <label style={{flex:1,marginLeft:10}}>Total Price</label>
                    <TextInput
                        style={styles.priceInput}
                        placeholder="Total Item Price"
                        value={itemTotalPrice}
                        onChangeText={() => { }}
                        keyboardType="numeric"
                        editable={false}
                    />
                </View>



            </View>

            <FloatingLabelInput
                label="Miscellaneous"
                value={itemMisc}
                onChangeText={setItemMisc}
                
            />
            <TouchableOpacity style={styles.button} onPress={handleSaveItem}>
                <Text style={styles.buttonText}>Save Item</Text>
            </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    field: {
        marginBottom: 15,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    priceInput: {
        marginTop:5,
        height: 40,
        // marginStart: 44,
        marginRight:20,
flex:1,
        width: '50%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    inputFocused: {
        borderColor: '#007BFF',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    dierction: {
        flexDirection: 'row'
    }
});

export default CreateNewEntry;
