// Dashboard.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../app/(tabs)/types';

type Props = StackScreenProps<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Reports Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reports</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.tile}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="description" size={36} color="#FF6347" style={styles.icon} />
            </View>
            <Text style={styles.tileText}>All <br/> Invoices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="request-quote" size={36} color="#4682B4" style={styles.icon} />
            </View>
            <Text style={styles.tileText}>All<br/>Quotations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="event" size={36} color="#32CD32" style={styles.icon} />
            </View>
            <Text style={styles.tileText}>All<br/> Events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="people" size={36} color="#FFD700" style={styles.icon} />
            </View>
            <Text style={styles.tileText}>All<br/>Vendors</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Links Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.tile}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="add-circle-outline" size={36} color="#FF4500" style={styles.icon} />
            </View>
            <Text style={styles.tileText}>Create<br/> Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="post-add" size={36} color="#1E90FF" style={styles.icon} />
            </View>
            <Text style={styles.tileText}>Create<br/> Quotation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('VendorRegisteration')}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="person-add" size={36} color="#8A2BE2" style={styles.icon} />
            </View>
            <Text style={styles.tileText}>Vendor<br/>Registration</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Revenue Graph Section */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Revenue Graph</Text>
          <Text style={styles.sortText}>Sort By</Text>
        </View>
        <View style={styles.graph}>
          <Text style={styles.graphText}>Revenue Performance</Text>
          {/* Placeholder for Graph Component */}
        </View>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 10,
  },
  tileText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    color: '#007bff',
  },
  graph: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef2f9',
    borderRadius: 8,
    marginVertical: 10,
  },
  graphText: {
    fontSize: 16,
    color: '#000',
  },
  detailsButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
