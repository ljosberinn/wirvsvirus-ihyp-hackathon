import PropTypes from 'prop-types';
import { File, Title, Field, Image, Help, Message, Block, Label } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUpload } from 'react-icons/fa';

import { Icon, Checkbox } from '../../../../../components';
import styles from './ImageStep.module.scss';

export default function ImageStep({ handleChange, img, imgSecurity }) {
  const { t } = useTranslation('onboarding');

  function removeImage() {
    handleChange({ target: { type: 'file', files: [], name: 'img' } });
  }

  return (
    <>
      <Title size={5}>{t('photo-title')}</Title>
      <Field>
        <File align="centered" hasName boxed color="success">
          {img ? (
            <Image.Container size={128}>
              <Image src={img} rounded onClick={removeImage} />
            </Image.Container>
          ) : (
            <File.Label>
              <File.Input name="hah-img" onInput={handleChange} />

              <File.CTA>
                <File.Icon>
                  <Icon svg={FaUpload} />
                </File.Icon>
                <File.Label as="span">{t('upload-cta')}</File.Label>
              </File.CTA>
            </File.Label>
          )}
        </File>
        <Block className={styles.block}>
          <Message>
            <Message.Body>
              <Checkbox
                color="primary"
                id="imgSecurity"
                onChange={handleChange}
                name="hah-imgSecurity"
                checked={imgSecurity}
              />
              <Label htmlFor="imgSecurity">{t('upload-security-label')}</Label>
              <ul className={styles.list}>
                <li>
                  <Help>{t('upload-help-1')}</Help>
                </li>
                <li>
                  <Help>{t('upload-help-2')}</Help>
                </li>
                <li>
                  <Help>{t('upload-help-3')}</Help>
                </li>
              </ul>
            </Message.Body>
          </Message>
        </Block>
      </Field>
    </>
  );
}

ImageStep.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
