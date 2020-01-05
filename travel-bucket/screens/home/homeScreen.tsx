import React from 'react';
import { TouchableOpacity, FlatList, Alert } from 'react-native';
import Page from '../../components/page';
import Title from '../../components/title';
import { TopBar } from './style';
import { AntDesign } from '@expo/vector-icons';
import { palette } from '../../utils/style';
import TripCard from '../../components/tripCard';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GQLTrip } from 'travel-bucket-shared';
import { NavigationScreenProp } from 'react-navigation';
import { useNavigationEvents } from 'react-navigation-hooks';

const GET_TRIPS = gql`
  {
    trips: getTrips {
      id
      name
      destinations {
        id
        name
        startDate
        endDate
        image
        todoItems {
          name
          completed
        }
      }
    }
  }
`;

const CREATE_TRIP = gql`
  mutation createTrip {
    trip: createTrip {
      id
    }
  }
`;

const HomeScreen: React.FC<{ navigation: NavigationScreenProp<any> }> = ({ navigation }) => {
  const res = useQuery<{ trips: GQLTrip[] }>(GET_TRIPS, { fetchPolicy: 'cache-and-network' });
  const trips = res.data && res.data.trips ? res.data.trips : [];

  const [createTrip] = useMutation(CREATE_TRIP);

  useNavigationEvents(evt => {
    if (evt.type === 'willFocus') {
      res.refetch();
    }
  });
  return (
    <Page>
      <TopBar>
        <Title>My Trips</Title>

        <TouchableOpacity
          onPress={() => {
            Alert.alert('New trip', '', [
              {
                text: 'Single stop',
                onPress: () => {
                  navigation.navigate('Destination');
                },
              },
              {
                text: 'Multiple stops',
                onPress: async () => {
                  const tripRes = await createTrip();
                  if (tripRes.data && tripRes.data.trip) {
                    navigation.navigate('Trip', { tripID: tripRes.data.trip.id });
                  }
                },
              },
            ]);
          }}>
          <AntDesign name="pluscircleo" color={palette.red} size={20} style={{ marginRight: 16 }} />
        </TouchableOpacity>
      </TopBar>

      <FlatList
        data={trips}
        renderItem={t => (
          <TripCard
            trip={t.item}
            onPress={() => {
              if (t.item.destinations.length === 1) {
                navigation.navigate('Destination', { destination: t.item.destinations[0] });
              } else {
                navigation.navigate('Trip', { tripID: t.item.id });
              }
            }}
          />
        )}
      />
    </Page>
  );
};

export default HomeScreen;
