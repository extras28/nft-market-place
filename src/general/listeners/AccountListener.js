import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount } from 'app/authSlice';

AccountListener.propTypes = {};

const sTag = '[AccountListener]';

function AccountListener(props) {
  // MARK: --- Params ---
  const dispatch = useDispatch();
  const currentAccount = useSelector((state) => state?.auth?.current);

  // MARK: --- Function ---
  async function listAccount() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      dispatch(getAccount(accounts[0]));
      return accounts;
    } catch (error) {
      console.log(`${sTag} get list account error: ${error.message}`);
    }
  }

  // MARK: --- Hooks ---
  useEffect(() => {
    // if (!currentAccount) {
    listAccount();
    // }
  }, []);
  return <></>;
}

export default AccountListener;
