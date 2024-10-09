// content.tsx
import React from 'react';

interface Car {
    id: number;
    placa: string;
}

interface ContentProps {
    cars: Car[];
}

const Content: React.FC<ContentProps> = ({ cars }) => {
    return (
        <div>
            <h1>Lista de Carros</h1>
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>
                        {car.placa}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Content;
