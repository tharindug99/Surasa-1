import React from 'react'
import { useEffect } from 'react';
import useLoading from 'hooks/useLoading';
import { useDocumentTitle } from 'hooks/useDocumentTitle';

const Home =  props => {

    const{ title } = props;

    useDocumentTitle(title);


    return (
        <div>Home</div>
    )
}

export default Home
