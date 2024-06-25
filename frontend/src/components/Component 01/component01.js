import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
    height: 100vh;
    background: #c51d1d;
    scroll-snap-align: center;
`

const Component01 = () => {
    return (
        <Section>
            <h1>Component 01</h1>
        </Section>
    )
}



export default Component01