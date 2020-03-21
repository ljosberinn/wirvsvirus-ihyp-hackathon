import PropTypes from 'prop-types';
import { Control, Label, Input, Field, Title, Select } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';

const titles = ['bitte wählen', 'Herr', 'Frau'];

export default function ContactStep({
  handleChange,
  title,
  firstName,
  lastName,
  phone,
}) {
  const { t } = useTranslation('onboarding');

  return (
    <>
      <Title size={5}>{t('contact-title')}</Title>

      <Field>
        <Label htmlFor="title">{t('title')}</Label>
        <Control>
          <Select.Container>
            <Select
              required
              onChange={handleChange}
              name="title"
              defaultValue={title || titles[0]}
            >
              {titles.map(title => (
                <Select.Option disabled={title === titles[0]} key={title}>
                  {title}
                </Select.Option>
              ))}
            </Select>
          </Select.Container>
        </Control>
      </Field>

      <Field>
        <Label htmlFor="firstName">{t('firstName')}</Label>

        <Control>
          <Input
            type="text"
            placeholder="Vorname"
            name="firstName"
            id="firstName"
            onInput={handleChange}
            autoFocus
            required
            defaultValue={firstName}
          />
        </Control>
      </Field>

      <Field>
        <Label htmlFor="lastName">{t('lastName')}</Label>

        <Control>
          <Input
            type="text"
            placeholder="Nachname"
            name="lastName"
            id="lastName"
            onInput={handleChange}
            required
            defaultValue={lastName}
          />
        </Control>
      </Field>

      <Field>
        <Label htmlFor="phone">{t('phone')}</Label>

        <Control>
          <Input
            type="text"
            placeholder="Telefonnummer"
            name="phone"
            id="phone"
            onInput={handleChange}
            required
            defaultValue={phone}
          />
        </Control>
      </Field>
    </>
  );
}

ContactStep.propTypes = {
  handleChange: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  title: PropTypes.string,
  phone: PropTypes.string,
};
