import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Orders from '~/pages/Orders';
import OrderCRUD from '~/pages/OrderCRUD';
import Deliverymans from '~/pages/Deliverymans';
import DeliverymanCRUD from '~/pages/DeliverymanCRUD';
import Recipients from '~/pages/Recipients';
import RecipientCRUD from '~/pages/RecipientCRUD';
import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" component={Orders} isPrivate />
      <Route path="/orderCRUD" component={OrderCRUD} isPrivate />
      <Route path="/deliverymans" component={Deliverymans} isPrivate />
      <Route path="/deliverymanCRUD" component={DeliverymanCRUD} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/recipientCRUD" component={RecipientCRUD} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
