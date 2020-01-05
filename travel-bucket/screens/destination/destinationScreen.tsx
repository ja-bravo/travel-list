import React, { useState, useEffect, useRef } from 'react';
import Page from '../../components/page';
import gql from 'graphql-tag';
import { GQLDestination, GQLDestinationInput } from 'travel-bucket-shared';
import { NavigationScreenProp } from 'react-navigation';
import moment from 'moment';
import { TitleInput, Wrapper, Overlay, Subtitle, Year, Todos, TopBar, EditDate } from './style';
import { useMutation } from '@apollo/react-hooks';
import Button from '../../components/button';
import TodoItem from './todoItem';
import { Animated, Keyboard, Dimensions, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useColorScheme } from 'react-native-appearance';
import { extractGraphQLError } from '../../utils/errors';

const getSubtitle = (startDate: any, endDate: any) => {
  if (endDate && startDate) {
    return `${moment(startDate).format('DD MMM')} - ${moment(endDate).format('DD MMM')}`;
  } else if (startDate && !endDate) {
    return `${moment(startDate).format('DD MMM')}`;
  } else if (endDate && !startDate) {
    return `${moment(endDate).format('DD MMM')}`;
  } else return null;
};

const SEND_DESTINATION = gql`
  mutation createOrUpdateDestination($destination: DestinationInput) {
    res: createOrUpdateDestination(destination: $destination) {
      id
    }
  }
`;

const DestinationScreen: React.FC<{ navigation: NavigationScreenProp<any> }> = ({ navigation }) => {
  const destination: GQLDestination = navigation.getParam('destination', {});

  const [isStartDateVisible, setIsStartDateVisible] = useState(false);
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);

  const [todos, setTodos] = useState(destination.todoItems || []);
  const [defaultTodo, setDefaultTodo] = useState({ name: '', active: false });
  const [startDate, setStartDate] = useState(destination.startDate);
  const [endDate, setEndDate] = useState(destination.endDate);
  const [image, setImage] = useState(destination.image);
  const [name, setName] = useState(destination.name);

  const heightValue = useRef(new Animated.Value(0));

  const [saveItem] = useMutation<{ res: GQLDestination }, { destination: GQLDestinationInput }>(SEND_DESTINATION);

  const colorScheme = useColorScheme();
  useEffect(() => {
    const onShow = () => {
      Animated.timing(heightValue.current, {
        toValue: 1,
      }).start();
    };
    const onHide = () => {
      Animated.timing(heightValue.current, {
        toValue: 0,
      }).start();
    };

    const onShowListener = Keyboard.addListener('keyboardDidShow', onShow);
    const onHideListener = Keyboard.addListener('keyboardDidHide', onHide);

    return () => {
      onHideListener.remove();
      onShowListener.remove();
    };
  }, []);

  const save = async () => {
    const item: GQLDestinationInput = {
      id: destination.id,
      name,
      image,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : undefined,
      startDate: endDate ? moment(startDate).format('YYYY-MM-DD') : undefined,
      todoItems: todos.map(t => ({ name: t.name, completed: t.completed })),
      tripID: destination.tripID,
    };

    try {
      const res = await saveItem({ variables: { destination: item } });
      console.log(res);
      if (res.data && res.data.res && res.data.res.id) {
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Error', extractGraphQLError(e));
    }
  };
  return (
    <Page>
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <Wrapper
          source={{ uri: image }}
          style={{
            height: heightValue.current.interpolate({
              inputRange: [0, 1],
              outputRange: [Dimensions.get('screen').height * 0.35, 0],
            }),
          }}>
          <Overlay />
          <Subtitle>{getSubtitle(startDate, endDate)}</Subtitle>
          {startDate && <Year>{moment(destination.startDate).format('YYYY')}</Year>}

          <Button
            small
            text="Change cover"
            type="black"
            onPress={() =>
              navigation.navigate('ChangeCover', {
                onChange: (i: any) => {
                  setImage(i);
                },
              })
            }
            touchableStyle={{ position: 'absolute', bottom: 16 }}
            containerStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
          />
        </Wrapper>
        <TopBar>
          <TitleInput
            underlineColorAndroid="transparent"
            multiline
            value={name}
            onChangeText={setName}
            placeholder="Where are you going?"
            autoFocus={!destination.id}
          />
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Change trip dates', '', [
                {
                  text: 'Change start date',
                  onPress: () => setIsStartDateVisible(true),
                },
                {
                  text: 'Change end date',
                  onPress: () => setIsEndDateVisible(true),
                },
              ]);
            }}>
            <EditDate>Edit dates</EditDate>
          </TouchableOpacity>
        </TopBar>
        <Todos>
          {todos.map((t, i) => (
            <TodoItem
              key={`${t.name}${i}`}
              item={t}
              onBlur={i => {
                const index = todos.findIndex(todo => todo.name === t.name);
                const newTodos = [...todos];
                newTodos[index] = i;
                setTodos([...newTodos]);
              }}
              onLongPress={() => {
                Alert.alert('Delete item', null, [
                  {
                    text: 'Ok',
                    style: 'destructive',
                    onPress: () => {
                      setTodos([...todos.filter(td => td.name !== t.name)]);
                    },
                  },
                  {
                    text: 'Cancel',
                  },
                ]);
              }}
            />
          ))}
          <TodoItem
            key="default"
            item={defaultTodo}
            onBlur={i => {
              if (i.name) {
                setTodos([...todos, i]);
                setDefaultTodo({ name: '', active: false });
              }
            }}
          />
        </Todos>
      </ScrollView>
      <Button
        type="green"
        text="Save"
        onPress={save}
        touchableStyle={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 16 }}
      />

      <DateTimePicker
        isVisible={isStartDateVisible}
        mode="date"
        date={startDate ? moment(startDate).toDate() : new Date()}
        isDarkModeEnabled={colorScheme === 'dark'}
        onConfirm={d => {
          setStartDate(moment(d).format('YYYY-MM-DD'));
          setIsStartDateVisible(false);
        }}
        onCancel={() => setIsStartDateVisible(false)}
      />

      <DateTimePicker
        isVisible={isEndDateVisible}
        mode="date"
        date={endDate ? moment(endDate).toDate() : new Date()}
        isDarkModeEnabled={colorScheme === 'dark'}
        onConfirm={d => {
          setEndDate(moment(d).format('YYYY-MM-DD'));
          setIsEndDateVisible(false);
        }}
        onCancel={() => setIsEndDateVisible(false)}
      />
    </Page>
  );
};

export default DestinationScreen;
