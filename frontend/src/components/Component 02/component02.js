import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
    height: 100vh;
    background: blue;
    scroll-snap-align: center;
`

const Component02 = () => {
    return (
        <Section>
            <h1>Component 02</h1>
        </Section>
    )
}



export default Component02