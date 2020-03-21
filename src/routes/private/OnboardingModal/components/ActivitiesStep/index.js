import PropTypes from 'prop-types';
import { Title, Field, Control, Input, Label } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';
import { useGeolocation } from 'react-use';
import { usePlacePredictions } from 'use-google-maps-sdk';

import { Slider, Checkbox, Icon } from '../../../../../components';

const possibleActivities = ['SHOP', 'DOG', 'HOMEWORK', 'SHARE'];

const gmapsKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

export default function ActivitiesStep({
  handleChange,
  radius,
  address,
  activities,
}) {
  const { t } = useTranslation('onboarding');

  const geolocation = useGeolocation();

  const { results } = usePlacePredictions({
    key: gmapsKey,
    country: ['DE', 'AT', 'CH'],
    radius: radius * 1000,
    geolocation,
    input: address,
  });

  return (
    <>
      <Title size={5}>{t('activities-title')}</Title>

      <Field>
        <Control>
          <Slider
            fullwidth
            min="1"
            max="20"
            step="1"
            name="radius"
            onChange={handleChange}
            value={radius}
            unit="km"
          />
        </Control>
      </Field>

      <Field>
        <Label htmlFor="address">{t('address-label')}</Label>

        <Control iconLeft>
          <Icon svg={FaSearch} />
          <Input
            id="address"
            list="address-datalist"
            defaultValue={address}
            name="address"
            onChange={handleChange}
            required
            placeholder={t('address')}
          />
          <datalist id="address-datalist">
            {results.map(result => (
              <option key={result.id}>{result.description}</option>
            ))}
          </datalist>
        </Control>
      </Field>

      <Field>
        <ul>
          {possibleActivities.map(activity => (
            <li key={activity}>
              <Checkbox
                id={activity}
                value={activity}
                name="activities"
                checked={activities.includes(activity)}
                onChange={handleChange}
              />
              <Label htmlFor={activity}>
                {t(`activity-${activity.toLowerCase()}`)}
              </Label>
            </li>
          ))}
        </ul>
      </Field>
    </>
  );
}

ActivitiesStep.propTypes = {
  handleChange: PropTypes.func.isRequired,
  radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  activities: PropTypes.arrayOf(PropTypes.string),
  address: PropTypes.string,
};
