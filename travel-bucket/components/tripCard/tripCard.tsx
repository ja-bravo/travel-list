import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BaseText from '../baseText';
import { fonts, palette } from '../../utils/style';
import { GQLTrip, GQLDestination } from 'travel-bucket-shared';
import moment from 'moment';

interface IProps {
  onPress?: () => void;
  trip?: GQLTrip;
  destination?: GQLDestination;
}

const Wrapper = styled.ImageBackground`
  height: 180px;
  width: 100%;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

const Title = styled(BaseText)`
  color: white;
  font-family: ${fonts.bold};
  margin-bottom: 8px;
  text-align: center;
  font-size: 24px;
  width: 80%;
`;

const Subtitle = styled(BaseText)`
  color: white;
  font-family: ${fonts.bold};
  text-align: center;
  font-size: 14px;
`;

const Year = styled(BaseText)`
  color: white;
  font-family: ${fonts.bold};
  text-align: center;
  font-size: 14px;
`;

const Overlay = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: ${palette.blackBackground};
  opacity: 0.4;
  overflow: hidden;
`;

const TripCard: React.FC<IProps> = ({ onPress, trip, destination }) => {
  const getSubtitle = () => {
    if (trip) {
      let earliest = null;
      for (const d of trip.destinations) {
        if (d.startDate && !earliest) earliest = moment(d.startDate);
        if (d.startDate && moment(d.startDate).isBefore(earliest)) {
          earliest = moment(d.startDate);
        }
      }

      let latest = null;
      for (const d of trip.destinations) {
        if (d.endDate && !latest) latest = moment(d.endDate);
        if (d.endDate && moment(d.endDate).isBefore(latest)) {
          latest = moment(d.endDate);
        }
      }

      if (earliest && latest) {
        return `${earliest.format('DD MMM')} - ${latest.format('DD MMM')}`;
      } else if (earliest && !latest) {
        return `${moment(earliest).format('DD MMM')}`;
      } else if (latest && !earliest) {
        return `${moment(latest).format('DD MMM')}`;
      } else return null;
    } else {
      if (destination.endDate && destination.startDate) {
        return `${moment(destination.startDate).format('DD MMM')} - ${moment(destination.endDate).format('DD MMM')}`;
      } else if (destination.startDate && !destination.endDate) {
        return `${moment(destination.startDate).format('DD MMM')}`;
      } else if (destination.endDate && !destination.startDate) {
        return `${moment(destination.endDate).format('DD MMM')}`;
      } else return null;
    }
  };

  const getYear = () => {
    if (trip) {
      let earliest = null;
      for (const d of trip.destinations) {
        if (d.startDate && !earliest) earliest = moment(d.startDate);
        if (d.startDate && moment(d.startDate).isBefore(earliest)) {
          earliest = moment(d.startDate);
        }
      }

      if (earliest) {
        return `${moment(earliest).format('YYYY')}`;
      } else return null;
    } else {
      if (destination.startDate) {
        return moment(destination.startDate).format('YYYY');
      } else return null;
    }
  };

  const getTitle = () => {
    if (trip) {
      return trip.name;
    } else if (destination) {
      return destination.name;
    } else return 'Untitled';
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Wrapper source={{ uri: trip ? (trip.destinations[0] ? trip.destinations[0].image : '') : destination.image }}>
        <Overlay />
        <Title numberOfLines={2}>{getTitle()}</Title>
        <Subtitle>{getSubtitle()}</Subtitle>
        <Year>{getYear()}</Year>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default TripCard;
