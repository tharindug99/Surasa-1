import React from 'react'
import {useEffect} from 'react';
import useLoading from 'hooks/useLoading';
import {useDocumentTitle} from 'hooks/useDocumentTitle';
import styled from 'styled-components';
import Component01 from 'components/Component 01/component01';
import Component02 from 'components/Component 02/component02';

const Container = styled.div`
    height: 100vh;
    scroll-snap-type: y mandatory;
    scrol-behavior: smooth;
    overflow-y: auto;
    scroll-width: none;

    &::-webkit-scrollbar {
        display: none;

    }
`


const Home = props => {

    const {title} = props;

    useDocumentTitle(title);


    return (
        <Container>
            <Component01/>
            <Component02/>
        </Container>
    )
}

export default Home
