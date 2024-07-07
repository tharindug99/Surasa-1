import React from 'react'
import {useEffect} from 'react';
import useLoading from 'hooks/useLoading';
import {useDocumentTitle} from 'hooks/useDocumentTitle';
import Landing from 'components/Landing/landing';
import Component02 from 'components/Component 02/component02';
import Component03 from 'components/Component 03/component03';
import Component04 from 'components/Component04/component04';
import ContactUs from 'components/Contact/Contact';


const Home = props => {

    const {title} = props;

    useDocumentTitle(title);


    return (
        <>
            <Landing/>
            <Component02/>
            {/* <Component03/> */}
            <Component04/>
            <ContactUs/>
        </>
    )
}

export default Home
