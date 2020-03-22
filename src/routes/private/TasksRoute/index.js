import { Section, Box, Title, Table, Tag, Button } from 'rbx';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIdentityContext } from 'react-netlify-identity';

import { TemplatedHelmet } from '../../../components';
import { withSentry } from '../../../hocs';
import {
  getAllRequests,
  updateRequest,
} from '../../../services/RequestService';
import styles from './TasksRoute.module.scss';

export default withSentry(function TasksRoute() {
  const { t } = useTranslation('routes');
  const {
    user: { id },
  } = useIdentityContext();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, [id]);

  function fetchRequests() {
    getAllRequests()
      .then(requests => {
        setRequests(requests.filter(request => request.guardian === id));
      })
      .catch(console.error);
  }

  function handleAbortRequest(request) {
    updateRequest(request.id, { guardian: null, requestState: 'pending' })
      .then(() => {
        fetchRequests();
      })
      .catch(console.error);
  }

  function handleFinishRequest(request) {
    updateRequest(request.id, { requestState: 'confirm' })
      .then(() => {
        fetchRequests();
      })
      .catch(console.error);
  }

  function translateStatus(status) {
    return {
      pending: 'ausstehend',
      progress: 'in arbeit',
      confirm: 'in prüfung'
    }[status];
  }

  function renderControls(request) {
    if (request.requestState !== 'confirm') {
      return (
        <div className={styles.controls}>
          <Button
            size="small"
            type="button"
            color="success"
            onClick={() => handleFinishRequest(request)}
          >
            Abgeschlossen
          </Button>
          <Button
            size="small"
            type="button"
            color="info"
            onClick={() => handleAbortRequest(request)}
          >
            Aufgabe abgeben
          </Button>
        </div>
      );
    }
  }

  return (
    <>
      <TemplatedHelmet>
        <title>{t('tasks')}</title>
      </TemplatedHelmet>
      <Section className={styles.container} aria-labelledby="section-title">
        <Box shadowless>
          <Title id="section-title">{t('tasks')}</Title>

          <Table fullwidth narrow striped hoverable>
            <thead>
            <tr>
              <th>Status</th>
              <th>Datum</th>
              <th>Hilfesuchender</th>
              <th>Typ</th>
              <th>Mail</th>
              <th>Addresse</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {requests.map(request => {
              const {
                id,
                status,
                date,
                completeName,
                task,
                email,
                city,
                zip,
                street,
              } = request;

              return (
                <tr key={id}>
                  <td className={styles.requestState}>
                    <div className={styles[request.requestState]}>{translateStatus(request.requestState)}</div>
                  </td>
                  <td>{date}</td>
                  <td>{completeName} </td>
                  <td>{task}</td>
                  <td>{email}</td>
                  <td>{[city, zip, street].filter(Boolean).join(' ')}</td>
                  <td>
                    {renderControls(request)}
                  </td>
                </tr>
              );
            })}
            </tbody>
            <tfoot>
            <tr></tr>
            </tfoot>
          </Table>
        </Box>
      </Section>
    </>
  );
});
