import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { GQLTodoItem } from 'travel-bucket-shared';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { palette, fonts } from '../../utils/style';
import BaseText from '../../components/baseText';

const Wrapper = styled.View`
  width: 100%;
  min-height: 40px;
  flex-direction: row;
  align-items: center;
`;

const Ball = styled.View<{ active: boolean }>`
  height: 10px;
  width: 10px;
  margin-right: 16px;
  border-radius: 10px;
  border: 1px solid ${palette.red};
  background: ${p => (p.active ? palette.red : 'transparent')};
`;

const Name = styled.TextInput`
  font-family: ${fonts.bold};
  width: 90%;
`;

const TodoItem: React.FC<{ item?: GQLTodoItem; onBlur?: (val: GQLTodoItem) => void; onLongPress?: () => void }> = ({ item, onBlur, onLongPress }) => {
  const [value, setValue] = useState(item);
  useEffect(() => {
    setValue(item);
  }, [item]);
  return (
    <TouchableOpacity onPress={() => onBlur({ ...value, completed: !value.completed })} onLongPress={onLongPress}>
      <Wrapper>
        <Ball active={item.completed} />
        <Name
          multiline
          underlineColorAndroid="transparent"
          placeholder={item && item.name ? item.name : 'Add something you want to do...'}
          onBlur={() => onBlur(value)}
          value={value.name}
          onChangeText={t => {
            setValue({ ...value, name: t });
          }}
        />
      </Wrapper>
    </TouchableOpacity>
  );
};

export default TodoItem;
