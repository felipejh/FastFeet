export function signInRequest(deliverymanId) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { deliverymanId },
  };
}

export function signInSuccess(deliveryman) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { user: deliveryman },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
