import _ from 'lodash';
import axios from 'axios';

import { User } from '@/models/user.model';

const zapierRestClient = axios.create({
  baseURL: 'https://hooks.zapier.com/',
});

export const fleetGeneration = (user: User | null) => {
  if (_.isEmpty(user)) return null;
  const userData = user.dataValues;

  console.log(`Creating Lead for user ${userData.id}`, { user: userData });
  return zapierRestClient
    .post('hooks/catch/18609896/37bp6qs/', userData)
    .then(({ data }) =>
      console.log(`Lead information sent for user ${userData.id}`, {
        user: userData,
        response: data,
      })
    );
};
