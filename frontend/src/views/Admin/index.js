import React from 'react';
import { connect } from 'react-redux';
import { setAdmins } from 'redux/actions'; // You need to create setAdmins action
import AdminRequest from 'services/Requests/Admin'; // You need to create AdminRequest
import { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

const AdminDetail = props => { // Renamed from Landing to AdminDetail
  const { setAdmins, admins } = props; // Add admins to props
  const [loading, withLoading] = useLoading();

  const getAdmins = async () => { // New function for fetching admins
    try {
      const admins = await withLoading(AdminRequest.getAllAdmins()); // You need to create getAllAdmins function
      setAdmins(admins?.data);
      console.log(admins?.data); // Console log the admins
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  }

  useEffect(() => {
    if(admins?.length < 1){ // Fetch admins if not already fetched
      getAdmins();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        loading
          ? "Loading Admins"
          : <h4>Check console for admins data</h4>
      }
    </>
  )
};

const mapStateToProps = ({admin}) => { // Add admin to mapStateToProps
  const { admins } = admin; // You need to create admin reducer
  return { admins }
}

const mapDispatchToProps = {
  setAdmins // You need to create setAdmins action
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDetail); // Renamed from Landing to AdminDetail