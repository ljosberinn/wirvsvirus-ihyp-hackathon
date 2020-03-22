import { Button } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaGoogle, FaBitbucket, FaGitlab } from 'react-icons/fa';
import { useIdentityContext } from 'react-netlify-identity';

import { ENABLED_PROVIDER } from '../../constants/env';
import { upperCaseFirstCharacter } from '../../utils';
import Icon from '../Icon';
import styles from './LoginProviderGroup.module.scss';

const iconMap = {
  github: FaGithub,
  google: FaGoogle,
  bitbucket: FaBitbucket,
  gitlab: FaGitlab,
};

export default function LoginProviderGroup() {
  const { loginProvider } = useIdentityContext();
  const { t } = useTranslation('registration');

  return (
    <Button.Group className={styles.buttons}>
      {ENABLED_PROVIDER.map(provider => (
        <Button
          type="button"
          color="info"
          onClick={() => loginProvider(provider)}
          fullwidth
          key={provider}
        >
          <Icon svg={iconMap[provider]} className={styles.icon} />
          <span>
            {t('signInViaProvider', {
              provider: upperCaseFirstCharacter(provider),
            })}
          </span>
        </Button>
      ))}
    </Button.Group>
  );
}
