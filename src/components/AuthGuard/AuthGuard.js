import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setIsSetToken } from 'store/slices/session.slice';
import useRouter from 'utils/useRouter';
import apiStatus from 'utils/apiStatus';
import validatePermission from 'utils/validatePermission';

const AuthGuard = props => {
  const { requestPermissions, children } = props;
  const dispatch = useDispatch();
  const userPermissions = useSelector(state => state.session.userInfo.permissions);
  const sessionStatus = useSelector(state => state.session.status);
  const sessionError = useSelector(state => state.session.error);
  const router = useRouter();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const newAccessToken = urlParams.get('accessToken');


  useEffect(() => {
    // eslint-disable-next-line no-undef
    const automationLoginUrl = process.env.REACT_APP_LOGIN_PAGE;
    const accessToken = localStorage.getItem('accessToken');
    const originURL = window.location.href;

    if (!newAccessToken) {
      if (!accessToken) {
        window.location.href = automationLoginUrl + '?return_url=' + originURL;
      } else {
        dispatch(setIsSetToken(true));
      }
    } else {
      localStorage.setItem('accessToken', newAccessToken);
      dispatch(setIsSetToken(true));

      window.history.pushState({path:originURL.split('?')[0]},'',originURL.split('?')[0]);
    }
    // eslint-disable-next-line
  }, [sessionStatus, sessionError, router]);


  useEffect(() => {
    if (sessionStatus !== apiStatus.PENDING && sessionStatus !== apiStatus.TIMEOUT && validatePermission(userPermissions, requestPermissions)) {
      router.history.push('/errors/error-401');
      return;
    }

    // eslint-disable-next-line
  }, [router, sessionStatus]);

  return <Fragment>{children}</Fragment>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
  reRender: PropTypes.bool,
  requestPermissions: PropTypes.array.isRequired,
};

AuthGuard.defaultProps = {
  requestPermissions: []
};

export default AuthGuard;
