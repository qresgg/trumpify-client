import { Footer } from './Footer/footer.jsx';
import { Header } from './Header/header.jsx';
import { Main } from './Main/main.jsx';
import React, { useState } from 'react';

export function Layout () {

    return (
        <div>
            <Header />
            <Main/>
            <Footer />
        </div>
    )
}