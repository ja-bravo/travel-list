import React, { useState, useEffect } from 'react';
import Page from '../../components/page';
import { TopBar, TitleInput } from './style';
import { palette } from '../../utils/style';
import gql from 'graphql-tag';
import { GQLTrip } from 'travel-bucket-shared';
import { NavigationScreenProp, FlatList } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TripCard from '../../components/tripCard';
import { AntDesign } from '@expo/vector-icons';
import { useNavigationEvents } from 'react-navigation-hooks';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ActivityIndicator } from 'react-native';

const GET_TRIP = gql`
  query getTrip($tripID: String) {
    trip: getTrip(tripID: $tripID) {
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

const UPDATE_TRIP = gql`
  mutation updateTrip($name: String, $id: String) {
    res: updateTrip(name: $name, id: $id) {
      id
    }
  }
`;

const TripScreen: React.FC<{ navigation: NavigationScreenProp<any> }> = ({ navigation }) => {
  const tripID: string = navigation.getParam('tripID');
  const res = useQuery<{ trip: GQLTrip }>(GET_TRIP, { fetchPolicy: 'cache-and-network', variables: { tripID } });
  const trip = tripID ? res.data && res.data.trip : {};
  const [updateTrip] = useMutation(UPDATE_TRIP);

  const [name, setName] = useState(trip ? trip.name : '');
  const [shouldFocus, setShouldFocus] = useState(false);

  useEffect(() => {
    console.log(trip);
    if (!res.loading) {
      if (trip && trip.name) {
        setName(trip.name);
      } else {
        setShouldFocus(true);
      }
    }
  }, [res.loading]);

  useNavigationEvents(evt => {
    if (evt.type === 'willFocus') {
      res.refetch();
    }
  });

  return (
    <Page>
      {res.loading && <ActivityIndicator />}
      {trip && (
        <>
          <TopBar>
            <TitleInput
              underlineColorAndroid="transparent"
              value={name}
              onChangeText={setName}
              autoFocus={shouldFocus}
              placeholder="Where are you going?"
              onBlur={async () => {
                await updateTrip({ variables: { name, id: tripID } });
              }}
            />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Destination', { destination: { tripID } });
              }}>
              <AntDesign name="pluscircleo" color={palette.red} size={20} style={{ marginRight: 16 }} />
            </TouchableOpacity>
          </TopBar>

          <FlatList
            data={trip.destinations}
            renderItem={t => (
              <TripCard
                destination={t.item}
                onPress={() => {
                  navigation.navigate('Destination', { destination: t.item });
                }}
              />
            )}
          />
        </>
      )}
    </Page>
  );
};

export default TripScreen;
