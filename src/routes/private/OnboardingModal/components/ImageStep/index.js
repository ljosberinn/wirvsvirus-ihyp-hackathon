import PropTypes from 'prop-types';
import { File } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUpload } from 'react-icons/fa';

import { Icon } from '../../../../../components';

export default function ImageStep({ handleChange }) {
  const { t } = useTranslation('onboarding');

  return (
    <File hasName>
      <File.Label>
        <File.Input name="resume" handleChange={handleChange} />
        <File.CTA>
          <File.Icon>
            <Icon svg={FaUpload} />
          </File.Icon>
          <File.Label as="span">Choose a File</File.Label>
        </File.CTA>
        <File.Name>Screen Shot 2017-07-29 at 15.54.25.png</File.Name>
      </File.Label>
    </File>
  );
}

ImageStep.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
