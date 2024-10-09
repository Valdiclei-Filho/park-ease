// page.tsx
import React from 'react';
import Content from './content';
import { getCars } from './actions';

const Page: React.FC = async () => {
    const cars = await getCars(); // Busca os carros do banco de dados

    return (
        <div>
            <Content cars={cars} />
        </div>
    );
};

export default Page;
