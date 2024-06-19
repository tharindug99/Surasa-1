import React from 'react';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {APP_NAME} from 'configs/AppConfig';

const Header = props => {

    const {items} = props;

    return (
        <></>
    )

};


const mapStateToProps = ({cart}) => {
    const {items} = cart;
    return {items};
}

export default connect(mapStateToProps)(Header);